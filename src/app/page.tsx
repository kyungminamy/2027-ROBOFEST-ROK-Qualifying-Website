import {
  competition,
  formatKoreanDate,
  venueDisplayName,
} from "@/config/competition";

/* ============================================================================
 *  첫 화면(홈)
 *
 *  ★ 이 파일에는 글이 직접 적혀 있지 않습니다. ★
 *    날짜·장소·문구를 바꾸려면 config/competition.ts 를 수정하세요.
 *
 *  모바일 우선으로 만들었습니다. 휴대폰에서 먼저 보이는 모양이 기본이고,
 *  sm: / md: 가 붙은 것은 화면이 넓어질 때만 적용되는 설정입니다.
 * ========================================================================== */

/** 좌우 여백과 최대 너비 — 모든 구역이 같은 폭을 쓰도록 맞춥니다 */
const container = "mx-auto w-full max-w-3xl px-5 sm:px-6";

/** 핵심 정보 한 줄 (라벨 + 내용). 휴대폰에서는 위아래, 넓은 화면에서는 좌우로 배치 */
function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-brand-100 py-3 last:border-b-0 sm:flex-row sm:gap-4 sm:py-3.5">
      <dt className="shrink-0 text-sm font-bold text-brand-700 sm:w-28 sm:text-base">
        {label}
      </dt>
      <dd className="text-base text-ink sm:text-lg">{children}</dd>
    </div>
  );
}

export default function Home() {
  const { dates, registration, eligibility, worldChampionship, contact } =
    competition;

  /* 참가비는 현재 0(무료)으로 고정되어 있어 타입이 '0'으로 좁혀집니다.
     유료로 바뀔 가능성을 남겨두기 위해 숫자로 넓혀서 씁니다. */
  const feeKrw: number = registration.feeKrw;

  return (
    <>
      {/* ---------------------------------------------------------------- 머리말 */}
      <header className="bg-brand-700 text-white">
        <div className={`${container} py-3.5 sm:py-4`}>
          <p className="text-xs font-bold tracking-wide text-brand-100 sm:text-sm">
            {competition.host}
          </p>
          <p className="mt-0.5 text-base font-bold sm:text-lg">
            {competition.shortName}
          </p>
        </div>
      </header>

      <main className="flex-1">
        {/* ------------------------------------------------------------- 대표 영역 */}
        <section className="bg-brand-50 py-10 sm:py-14">
          <div className={container}>
            <h1 className="text-2xl font-bold text-brand-900 sm:text-3xl md:text-4xl">
              {competition.name}
            </h1>

            <p className="mt-4 text-base text-ink-soft sm:mt-5 sm:text-lg">
              {formatKoreanDate(dates.day1)} ~ {formatKoreanDate(dates.day2)}
              <br />
              {venueDisplayName()}
            </p>

            {/* 신청 버튼 — 실제 접수는 외부 폼(네이버 폼)에서 진행됩니다.
                주소가 확정되면 config 의 registration.formUrl 에 입력하고
                아래 표시를 실제 링크로 바꾸세요. */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <span className="inline-flex items-center justify-center rounded-lg bg-brand-700 px-6 py-3.5 text-base font-bold text-white sm:text-lg">
                참가 신청 준비 중
              </span>
              <span className="inline-flex items-center justify-center rounded-lg border-2 border-brand-200 bg-white px-6 py-3.5 text-base font-bold text-brand-700 sm:text-lg">
                대회 안내 보기
              </span>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              접수 기간: {formatKoreanDate(registration.opensAt)} ~{" "}
              {formatKoreanDate(registration.closesAt)}
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- 한눈에 보기 */}
        <section className="py-10 sm:py-14">
          <div className={container}>
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">
              한눈에 보기
            </h2>

            <dl className="mt-5 sm:mt-6">
              <InfoRow label="대회 일정">
                {formatKoreanDate(dates.day1)} ~ {formatKoreanDate(dates.day2)}
              </InfoRow>
              <InfoRow label="장소">{venueDisplayName()}</InfoRow>
              <InfoRow label="주최·주관">{competition.host}</InfoRow>
              <InfoRow label="운영·공인">
                {competition.operators.join(" · ")}
              </InfoRow>
              <InfoRow label="참가 대상">
                Junior {eligibility.junior}
                <br />
                Senior {eligibility.senior}
              </InfoRow>
              <InfoRow label="참가비">
                {feeKrw === 0
                  ? `무료 (${competition.host} 예산으로 운영)`
                  : `${feeKrw.toLocaleString("ko-KR")}원`}
              </InfoRow>
              <InfoRow label="참가 규모">
                {registration.targetTeams}팀 내외 (학생 약{" "}
                {registration.estimatedStudents}명)
              </InfoRow>
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------- 세계대회 안내 */}
        <section className="bg-paper-soft py-10 sm:py-14">
          <div className={container}>
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">
              {worldChampionship.year} 세계대회
            </h2>
            <p className="mt-3 text-base text-ink sm:text-lg">
              {worldChampionship.period} · {worldChampionship.location}
            </p>
            {/* ⚠️ 진출 팀 수는 미확정입니다. 아래 문구는 config 에서 관리하며
                '몇 팀이 진출한다'로 바꿔 쓰지 마세요. */}
            <p className="mt-4 text-base text-ink-soft">
              {worldChampionship.advancementNotice}
            </p>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- 꼬리말 */}
      <footer className="bg-brand-900 py-8 text-white sm:py-10">
        <div className={container}>
          <p className="text-base font-bold">{competition.shortName}</p>
          <p className="mt-2 text-sm text-brand-200">
            주최·주관 {competition.host}
            <br />
            운영 {contact.organization}
            {contact.hours ? ` · 문의 ${contact.hours}` : ""}
          </p>
          {/* 이메일·전화번호는 확정 후 config/competition.ts 의 contact 에 입력하면
              아래에 자동으로 표시됩니다. */}
          {(contact.email || contact.phone) && (
            <p className="mt-2 text-sm text-brand-200">
              {[contact.phone, contact.email].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </footer>
    </>
  );
}
