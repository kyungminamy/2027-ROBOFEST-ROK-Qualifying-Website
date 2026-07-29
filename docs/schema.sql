-- ============================================================================
--  2027 ROBOFEST 국내예선대회 — 참가 신청 데이터베이스 스키마
-- ============================================================================
--
--  【 사용 방법 】
--   1. Supabase 프로젝트 → 왼쪽 메뉴 'SQL Editor'
--   2. 이 파일 내용을 전체 복사해서 붙여넣기
--   3. 'Run' 버튼 클릭
--   4. 왼쪽 메뉴 'Table Editor'에서 테이블 3개가 보이면 성공
--
--  【 중요 】
--   이 스키마는 브라우저에서 직접 접근할 수 없도록 설계되어 있습니다.
--   신청 데이터는 반드시 서버(Next.js Route Handler)를 통해서만 저장됩니다.
--   참가 학생의 개인정보를 다루므로 이 원칙을 절대 바꾸지 마세요.
--
--  최종 수정: 2026-07-29
-- ============================================================================


-- ────────────────────────────────────────────────────────────────────────────
--  1. 팀 (신청 1건 = 1행)
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists teams (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  -- ─── 참가 종목 ───
  category_slug text not null,          -- 'game', 'bottlesumo' 등 competition.ts의 slug와 일치
  division      text not null,          -- 'Junior', 'Senior', 'Junior Classic' 등

  -- ─── 팀 정보 ───
  team_name_ko  text not null,
  team_name_en  text not null,          -- 로마자. 메달·상장에 그대로 인쇄됨
  organization  text not null,          -- 소속 학교/기관
  robot_platform        text,           -- 'LEGO EV3', 'Arduino' 등
  programming_language  text,
  project_description   text,           -- Exhibition·RoboArts·RoboMed 전용
  preview_video_url     text,           -- Exhibition·RoboArts·RoboMed 전용

  -- ─── 지도자 ───
  coach_name_ko text not null,
  coach_name_en text not null,
  coach_email   text not null,
  coach_phone   text not null,
  coach_org     text,
  region        text,                   -- 시·도

  -- ─── 동의 (개인정보보호법) ───
  consent_privacy   boolean not null default false,  -- 개인정보 수집·이용 동의
  consent_media     boolean not null default false,  -- 촬영·온라인 송출(초상권) 동의
  consent_guardian  boolean not null default false,  -- 만14세 미만 법정대리인 동의 확보 확인

  -- ─── 운영용 ───
  status      text not null default 'submitted',   -- submitted / confirmed / waitlist / cancelled
  edit_token  uuid not null default gen_random_uuid(),  -- 신청 수정용 비밀 키
  admin_notes text,

  -- ─── 데이터 검증 (잘못된 값이 애초에 저장되지 않도록) ───
  constraint teams_status_valid check (status in ('submitted','confirmed','waitlist','cancelled')),
  constraint teams_email_valid  check (coach_email like '%_@_%.__%'),
  constraint teams_consent_required check (consent_privacy = true and consent_media = true)
);


-- ────────────────────────────────────────────────────────────────────────────
--  2. 학생 (팀당 1~5명)
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists students (
  id       uuid primary key default gen_random_uuid(),
  team_id  uuid not null references teams(id) on delete cascade,
  seq      smallint not null,           -- 팀 내 순번 1~5

  name_ko  text not null,
  name_en  text not null,               -- 로마자. 메달·상장에 그대로 인쇄됨
  birth_date date not null,
  gender   text,
  school   text not null,
  grade    text not null,               -- '초5', '중2', '고1' 등

  -- 보호자 (만14세 미만은 법정대리인 동의 필수 — 개인정보보호법)
  guardian_name  text not null,
  guardian_phone text not null,
  guardian_email text,

  health_notes text,                    -- 알레르기 등 안전관리용 (선택)

  constraint students_seq_range check (seq between 1 and 5),
  constraint students_seq_unique unique (team_id, seq)
);


-- ────────────────────────────────────────────────────────────────────────────
--  3. 정원 관리 (종목별 최대 팀 수)
--     competition.ts의 capacity 값과 일치시켜 주세요.
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists category_capacity (
  category_slug text not null,
  division      text not null,
  max_teams     integer not null,
  primary key (category_slug, division)
);


-- ────────────────────────────────────────────────────────────────────────────
--  4. 조회 속도 향상용 인덱스
-- ────────────────────────────────────────────────────────────────────────────
create index if not exists idx_teams_category on teams (category_slug, division);
create index if not exists idx_teams_status   on teams (status);
create index if not exists idx_teams_created  on teams (created_at);
create index if not exists idx_students_team  on students (team_id);


-- ────────────────────────────────────────────────────────────────────────────
--  5. 자동 updated_at 갱신
-- ────────────────────────────────────────────────────────────────────────────
create or replace function touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_teams_updated on teams;
create trigger trg_teams_updated before update on teams
  for each row execute function touch_updated_at();


-- ────────────────────────────────────────────────────────────────────────────
--  6. 보안 — RLS(행 수준 보안) 활성화
--
--     정책을 하나도 만들지 않으면 = 브라우저에서 아무것도 못 읽고 못 씁니다.
--     이것이 의도된 설정입니다. 서버(service_role 키)만 접근할 수 있습니다.
--
--     ⚠️ 절대 'create policy ... using (true)' 같은 걸 추가하지 마세요.
--        학생 개인정보가 인터넷에 그대로 공개됩니다.
-- ────────────────────────────────────────────────────────────────────────────
alter table teams             enable row level security;
alter table students          enable row level security;
alter table category_capacity enable row level security;


-- ────────────────────────────────────────────────────────────────────────────
--  7. 정원 현황 뷰 — 홈페이지의 '잔여 팀 수' 표시에 사용
--     개인정보가 전혀 포함되지 않으므로 안전하게 노출 가능합니다.
-- ────────────────────────────────────────────────────────────────────────────
create or replace view v_capacity_status as
select
  c.category_slug,
  c.division,
  c.max_teams,
  count(t.id) filter (where t.status in ('submitted','confirmed')) as registered,
  greatest(c.max_teams - count(t.id) filter (where t.status in ('submitted','confirmed')), 0) as remaining,
  (count(t.id) filter (where t.status in ('submitted','confirmed')) >= c.max_teams) as is_full
from category_capacity c
left join teams t
  on t.category_slug = c.category_slug and t.division = c.division
group by c.category_slug, c.division, c.max_teams;


-- ────────────────────────────────────────────────────────────────────────────
--  8. 명단 내보내기 뷰 — 운영팀이 CSV로 받아 명찰·상장·검수에 사용
--
--     Supabase → Table Editor → v_team_export → Export to CSV
--     학생 5명이 가로로 펼쳐지므로 엑셀에서 바로 쓸 수 있습니다.
-- ────────────────────────────────────────────────────────────────────────────
create or replace view v_team_export as
select
  t.created_at                                   as 신청일시,
  t.category_slug                                as 종목,
  t.division                                     as 부문,
  t.status                                       as 상태,
  t.team_name_ko                                 as 팀명,
  t.team_name_en                                 as 팀명영문,
  t.organization                                 as 소속,
  t.coach_name_ko                                as 지도자,
  t.coach_phone                                  as 지도자연락처,
  t.coach_email                                  as 지도자이메일,
  t.region                                       as 지역,
  t.robot_platform                               as 로봇플랫폼,
  t.programming_language                         as 사용언어,
  (select count(*) from students s where s.team_id = t.id) as 학생수,
  max(case when s.seq=1 then s.name_ko end)      as 학생1,
  max(case when s.seq=1 then s.name_en end)      as 학생1영문,
  max(case when s.seq=1 then s.grade  end)       as 학생1학년,
  max(case when s.seq=1 then s.school end)       as 학생1학교,
  max(case when s.seq=1 then s.guardian_phone end) as 학생1보호자연락처,
  max(case when s.seq=2 then s.name_ko end)      as 학생2,
  max(case when s.seq=2 then s.name_en end)      as 학생2영문,
  max(case when s.seq=2 then s.grade  end)       as 학생2학년,
  max(case when s.seq=2 then s.school end)       as 학생2학교,
  max(case when s.seq=2 then s.guardian_phone end) as 학생2보호자연락처,
  max(case when s.seq=3 then s.name_ko end)      as 학생3,
  max(case when s.seq=3 then s.name_en end)      as 학생3영문,
  max(case when s.seq=3 then s.grade  end)       as 학생3학년,
  max(case when s.seq=3 then s.school end)       as 학생3학교,
  max(case when s.seq=3 then s.guardian_phone end) as 학생3보호자연락처,
  max(case when s.seq=4 then s.name_ko end)      as 학생4,
  max(case when s.seq=4 then s.name_en end)      as 학생4영문,
  max(case when s.seq=4 then s.grade  end)       as 학생4학년,
  max(case when s.seq=4 then s.school end)       as 학생4학교,
  max(case when s.seq=4 then s.guardian_phone end) as 학생4보호자연락처,
  max(case when s.seq=5 then s.name_ko end)      as 학생5,
  max(case when s.seq=5 then s.name_en end)      as 학생5영문,
  max(case when s.seq=5 then s.grade  end)       as 학생5학년,
  max(case when s.seq=5 then s.school end)       as 학생5학교,
  max(case when s.seq=5 then s.guardian_phone end) as 학생5보호자연락처,
  t.admin_notes                                  as 비고
from teams t
left join students s on s.team_id = t.id
group by t.id
order by t.category_slug, t.division, t.created_at;


-- ────────────────────────────────────────────────────────────────────────────
--  9. 정원 초기값 — competition.ts의 capacity와 반드시 일치시키세요
--     부문이 여러 개인 종목은 정원을 나눠서 입력합니다.
-- ────────────────────────────────────────────────────────────────────────────
insert into category_capacity (category_slug, division, max_teams) values
  ('game',        'Junior', 12), ('game',        'Senior', 12),
  ('exhibition',  'Junior',  8), ('exhibition',  'Senior',  8),
  ('umc',         'Junior',  6), ('umc',         'Senior',  6),
  ('bottlesumo',  'Junior Classic',   6), ('bottlesumo', 'Junior Unlimited', 4),
  ('bottlesumo',  'Senior Classic',   6), ('bottlesumo', 'Senior Unlimited', 4),
  ('vcc',         'Senior',  6),
  ('roboparade',  'Expanded Junior', 10),
  ('roboarts',    'Junior',  3), ('roboarts',    'Senior',  3),
  ('robomed',     'Junior',  3), ('robomed',     'Senior',  3)
on conflict (category_slug, division) do nothing;
