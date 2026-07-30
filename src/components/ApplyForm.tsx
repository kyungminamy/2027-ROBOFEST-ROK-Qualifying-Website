import {
  applyFormDirectUrl,
  applyFormEmbedUrl,
  competition,
  formatKoreanDate,
} from "@/config/competition";

/* ============================================================================
 *  참가 신청 — 구글폼을 페이지 안에 넣어 보여줍니다
 *
 *  ★ 접수 기간이 아니어도 폼은 항상 보입니다. (일부러 이렇게 했습니다) ★
 *
 *   예전에는 접수 시작일(9/1) 전에는 폼을 숨겼습니다. 그런데 그 방식은
 *   실제로 아무것도 막지 못했습니다. 구글폼 주소를 아는 사람은 우리
 *   사이트를 거치지 않고 언제든 제출할 수 있기 때문입니다.
 *
 *   ★★★ 접수를 실제로 열고 닫는 것은 '구글폼의 응답 받기' 설정입니다 ★★★
 *
 *    · 접수를 닫으려면 → 구글폼에서 '응답 받기'를 끄세요.
 *      그러면 이 자리에 구글이 '더 이상 응답을 받지 않습니다'를 보여줍니다.
 *    · 이 사이트의 날짜(opensAt/closesAt)는 '안내 문구'일 뿐입니다.
 *      날짜만 바꿔도 접수는 닫히지 않습니다.
 *
 *   문 두 개(사이트 날짜 + 구글 설정)가 서로 다르게 말하는 상황을 없애려고
 *   문을 하나(구글 설정)로 줄였습니다.
 *
 *  ★ 폼 안쪽은 우리가 꾸밀 수 없습니다 ★
 *   구글폼은 다른 사이트(구글)의 화면을 창처럼 끼워 넣는 방식입니다.
 *   그래서 글꼴·색·줄바꿈 설정이 폼 안쪽에는 적용되지 않습니다.
 *   폼 안쪽 질문을 바꾸려면 구글폼 편집 화면에서 바꾸세요.
 *
 *  ★ 주소·높이·안내 문구는 config/competition.ts 에서 바꾸세요 ★
 * ========================================================================== */

/** 새 창에서 폼 열기 — 폼이 안 보이는 사람을 위한 최후의 통로 */
function DirectFormLink({ label }: { label: string }) {
  const href = applyFormDirectUrl();
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center rounded-lg bg-brand-700 px-6 py-4 text-base font-bold text-white sm:w-auto sm:text-lg"
    >
      {label}
    </a>
  );
}

export function ApplyForm() {
  const { registration } = competition;
  const embedUrl = applyFormEmbedUrl();

  return (
    <div>
      {/* ⚠️ 법적으로 필요한 안내입니다. 폼보다 먼저 보여야 합니다.
             문구는 config/competition.ts 에서 바꾸세요.
             폼 마지막의 동의 항목과 내용이 어긋나지 않게 같이 고치세요. */}
      <div className="rounded-xl border-2 border-brand-200 bg-brand-50 p-5 sm:p-6">
        <h3 className="text-base font-bold text-brand-900 sm:text-lg">
          신청 전 안내
        </h3>

        <dl className="mt-3 space-y-3">
          <div>
            <dt className="text-sm font-bold text-brand-700 sm:text-base">
              개인정보 처리
            </dt>
            <dd className="mt-1 text-sm text-ink sm:text-base">
              {registration.privacyNotice}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-bold text-brand-700 sm:text-base">
              촬영 · 초상권
            </dt>
            <dd className="mt-1 text-sm text-ink sm:text-base">
              {registration.portraitRightsNotice}
            </dd>
          </div>
        </dl>

        <p className="mt-3 border-t border-brand-200 pt-3 text-sm text-ink-soft">
          {registration.consentNoticeFooter}
        </p>
      </div>

      {/* 접수 기간 안내 — 사실만 알려 줍니다. 폼을 막지는 않습니다. */}
      <p className="mt-6 text-base text-ink sm:text-lg">
        접수 기간: {formatKoreanDate(registration.opensAt)} ~{" "}
        {formatKoreanDate(registration.closesAt)}
      </p>
      <p className="mt-1 text-sm text-ink-soft">
        종목별 정원제로 조기 마감될 수 있습니다.
      </p>

      {/* --------------------------------------------------------- 폼 본체 */}
      {!embedUrl ? (
        /* 구글폼 주소가 아직 비어 있습니다.
           config 의 registration.formUrl 에 주소를 넣으면 폼이 나타납니다.
           눌러도 아무 일 안 나는 버튼을 만들지 않기 위한 안전장치입니다. */
        <div className="mt-5 rounded-xl border-2 border-brand-200 bg-brand-50 p-5 sm:p-7">
          <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">
            접수 링크 준비 중
          </h2>
          <p className="mt-2 text-base text-ink sm:text-lg">
            참가 신청 폼을 준비하고 있습니다. 잠시 후 다시 확인해 주세요.
          </p>
        </div>
      ) : registration.applyMode === "embed" ? (
        <>
          <div className="mt-5 overflow-hidden rounded-xl border border-brand-200 bg-white">
            <iframe
              src={embedUrl}
              /* 높이는 config 의 embedHeight 에서 가져옵니다.
                 화면 크기별로 어느 값을 쓸지는 globals.css 의 .form-embed
                 규칙이 정합니다. 구글 정책상 자동으로 맞출 수 없습니다. */
              style={
                {
                  "--form-h-narrow-phone": `${registration.embedHeight.narrowPhone}px`,
                  "--form-h-phone": `${registration.embedHeight.phone}px`,
                  "--form-h-large-phone": `${registration.embedHeight.largePhone}px`,
                  "--form-h-desktop": `${registration.embedHeight.desktop}px`,
                } as React.CSSProperties
              }
              /* CSS가 아직 적용되지 않은 아주 짧은 순간에도 칸이 찌그러지지
                 않도록, 가장 큰 값을 기본 높이로 함께 지정합니다. */
              height={registration.embedHeight.narrowPhone}
              className="form-embed block w-full"
              /* 폼을 아직 못 읽은 사람에게도 무엇인지 알려 줍니다 */
              title="참가 신청 폼"
              loading="lazy"
            >
              참가 신청 폼을 불러올 수 없습니다.
            </iframe>
          </div>

          {/* ★ 지우지 마세요 ★
              학교 인터넷이 구글을 막아 두면 위 폼이 빈 칸으로 보입니다.
              그런 사람에게 남는 유일한 통로입니다. */}
          <div className="mt-5">
            <p className="text-sm text-ink-soft">
              위에 신청 폼이 보이지 않거나 작성이 어려우시면, 아래 버튼으로 새
              창에서 작성해 주세요.
            </p>
            <div className="mt-3">
              <DirectFormLink label="새 창에서 신청 폼 열기" />
            </div>
          </div>
        </>
      ) : (
        /* applyMode 가 'link' 일 때 — 폼을 넣지 않고 버튼만 보여줍니다 */
        <div className="mt-5">
          <DirectFormLink label="구글폼에서 참가 신청하기" />
          <p className="mt-3 text-sm text-ink-soft">
            신청 폼은 새 창에서 열립니다.
          </p>
        </div>
      )}
    </div>
  );
}
