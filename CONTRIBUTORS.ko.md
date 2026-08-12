# 만든 사람들 (CONTRIBUTORS)

2027 ROBOFEST World Championship 국내예선대회 누리집
`https://robofestbusan2026.com`

> 🇺🇸 English: [`CONTRIBUTORS.md`](CONTRIBUTORS.md)

---

## ⚠️ 커밋 기록만 보면 누가 만들었는지 알 수 없습니다

이 저장소의 커밋은 **두 개의 부서 공용 계정**으로 작성되었습니다. 개인
계정이 아닙니다. 그래서 GitHub 화면에서는 모든 작업이 `luxroboeducation`
계정 하나가 한 것처럼 보입니다.

**실제로 누가 작업했는지 남겨 두기 위해 이 파일을 만듭니다.**

| git 기록에 남은 작성자 | 실제 작업자 |
| --- | --- |
| `lux_1 <lux_1@luxrobo.com>` | **Silas Lim (임수현)** · GitHub [@limsooh](https://github.com/limsooh) · lim.sooh5@gmail.com |
| `luxroboeducation <luxrobo.education@gmail.com>` | **Amy Lee (이경민)** · kyungminamy@gmail.com |

> ℹ️ 위 두 주소(`lux_1@luxrobo.com`, `luxrobo.education@gmail.com`)는
> **부서에서 함께 쓰는 계정**입니다. 특정 개인의 것이 아닙니다.
> 오른쪽 칸의 이름과 개인 주소가 실제 작업자입니다.

---

## 누가 무엇을 했나

### Silas Lim (임수현) — GitHub [@limsooh](https://github.com/limsooh)

**커밋 136개 / 전체 153개 중 89%** · 2026-07-29 ~ 2026-08-12

사이트 전체를 설계하고 만들었습니다.

- **Next.js(App Router) + TypeScript + Tailwind** 기반 정적 사이트 구축,
  Vercel 배포 및 도메인(`robofestbusan2026.com`) 연결
- 모든 화면 — 홈 · ROBOFEST 소개 · 종목 안내(8종목 상세 포함) ·
  일정 · 오시는 길 · 자주 묻는 질문 · 참가 신청
- **구글폼 접수 연동** — 참가자 개인정보를 자체 서버에 저장하지 않는 구조로
  설계했습니다 (데이터베이스 없음)
- **아무도 관리하지 않아도 돌아가도록** 설계 — 내용을 잘못 고치면 배포가
  아니라 빌드가 깨지고, Vercel 이 직전 정상 버전을 계속 서비스합니다
- **접근성** — 머리띠 사진마다 명암비를 직접 계산해 기준(제목 3:1,
  본문 4.5:1) 충족을 확인
- **후임자용 문서 약 3,900줄 작성** — 비개발자가 브라우저만으로 운영할 수
  있도록 쓴 `docs/RUNBOOK.md`(1,124줄),
  `docs/RUNBOOK-CLAUDE-CODE.md`(864줄), 판단 기록
  `docs/SESSION-LOG.md`(1,718줄), 규칙 문서 `CLAUDE.md`

### Amy Lee (이경민)

**커밋 17개** · 2026-08-04 ~ 2026-08-12

- 머리띠 배경 사진 교체, 화면 다듬기, 문서 보완

---

## 주최 · 주관

| 역할 | 기관 |
| --- | --- |
| 주최 | 부산광역시교육청 |
| 주관 · 운영 | (주)럭스로보 |

---

## 확인하는 방법

이 파일의 숫자는 모두 git 기록에서 바로 확인할 수 있습니다.

```bash
# 작성자별 커밋 수 (136 / 17 이 나옵니다)
git log --format='%an <%ae>' | sort | uniq -c | sort -rn

# 작업 기간
git log --author="lux_1@luxrobo.com" --format='%ad' --date=short | sort | sed -n '1p;$p'
```

---

*작성: 2026-08-12*
