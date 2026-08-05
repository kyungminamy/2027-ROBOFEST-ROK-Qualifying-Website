import {
  applyFormDirectUrl,
  applyFormEmbedUrl,
  competition,
  formatKoreanDateRange,
} from "@/config/competition";
import { ExternalLink } from "@/components/icons";

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
      className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-accent-600 px-7 text-base font-bold text-white shadow-lg shadow-accent-600/20 transition-colors hover:bg-accent-700 sm:w-auto sm:text-lg"
    >
      {label}
      <ExternalLink className="h-5 w-5" />
    </a>
  );
}

export function ApplyForm() {
  const { registration } = competition;
  const embedUrl = applyFormEmbedUrl();

  return (
    <div>
      {/* ★★★ 개인정보·초상권 안내는 여기에 없습니다 (2026-08-05) ★★★
             src/app/apply/page.tsx 의 '신청 전 확인해 주세요' 상자로
             옮겨서, 참가 대상·참가비·규정과 한 상자에 모았습니다.
             이름이 비슷한 상자가 두 개라 아래쪽을 못 보고 지나치는 분이
             있었기 때문입니다. (부산광역시교육청 요청)

             ⚠️ 여기에 안내 상자를 '다시' 만들지 마세요 ⚠️
              같은 내용이 두 번 나오게 됩니다. 그리고 두 곳에 적어 두면
              한쪽만 고쳐서 서로 다른 말을 하게 됩니다.

             ⚠️ 다만 그 안내는 **폼보다 위에 있어야 합니다.**
              지금은 이 컴포넌트를 부르는 페이지가 그 역할을 합니다.
              이 컴포넌트를 다른 페이지에서 쓰게 되면, 그 페이지에도
              같은 안내를 폼 위에 반드시 넣어야 합니다.
              (CLAUDE.md 의 개인정보 절 참고) */}

      {/* 접수 기간 안내 — 사실만 알려 줍니다. 폼을 막지는 않습니다. */}
      <p className="tabular text-base font-bold text-brand-900 sm:text-lg">
        접수 기간:{" "}
        {formatKoreanDateRange(registration.opensAt, registration.closesAt)}
      </p>
      <p className="mt-1 text-sm text-ink-soft">
        종목별 정원제로 조기 마감될 수 있습니다.
      </p>

      {/* --------------------------------------------------------- 폼 본체 */}
      {!embedUrl ? (
        /* 구글폼 주소가 아직 비어 있습니다.
           config 의 registration.formUrl 에 주소를 넣으면 폼이 나타납니다.
           눌러도 아무 일 안 나는 버튼을 만들지 않기 위한 안전장치입니다. */
        <div className="mt-6 rounded-2xl border-2 border-brand-200 bg-brand-50 p-6 sm:p-8">
          <h2 className="text-xl text-brand-900 sm:text-2xl">
            접수 링크 준비 중
          </h2>
          <p className="mt-2 text-base text-ink sm:text-lg">
            참가 신청 폼을 준비하고 있습니다. 잠시 후 다시 확인해 주세요.
          </p>
        </div>
      ) : registration.applyMode === "embed" ? (
        <>
          {/* ★ 지우지 마세요 ★
              학교 인터넷이 구글을 막아 두면 아래 폼이 빈 칸으로 보입니다.
              그런 사람에게 남는 유일한 통로입니다.

              ℹ️ 2026-07-31: 이 버튼을 폼 '아래'에서 '위'로 옮겼습니다.
                 폼이 막혀 빈 칸만 보이는 사람은 화면을 한참 내려야
                 버튼을 찾을 수 있었습니다. 정작 이 버튼이 가장 필요한
                 사람이 가장 늦게 발견하는 구조였습니다. */}
          {/* ℹ️ 2026-07-31: 안내 문장('아래 신청 폼이 보이지 않거나…')과
                 회색 상자를 뺐습니다. 구글폼이 파일 업로드 질문 때문에
                 폼 내용을 우리 페이지 안에 그려 주지 않고, 대신 자기
                 '설문지 작성' 버튼만 보여 주게 되었기 때문입니다.
                 문장이 설명하던 상황('폼이 안 보이면')이 이제 상시 상태라
                 문장이 오히려 헷갈리게 만듭니다.

                 ★ 버튼 자체는 남겨 두었습니다 (지우지 마세요) ★
                   구글폼의 '설문지 작성' 버튼은 구글이 열릴 때만 보입니다.
                   학교 인터넷이 구글을 막으면 아래 칸이 통째로 비어서
                   그 버튼도 같이 사라집니다. 그때 남는 유일한 통로입니다. */}
          <div className="mt-6">
            <DirectFormLink label="새 창에서 신청 폼 열기" />
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-brand-200 bg-paper">
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
                  "--form-h-wide-desktop": `${registration.embedHeight.wideDesktop}px`,
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
        </>
      ) : (
        /* applyMode 가 'link' 일 때 — 폼을 넣지 않고 버튼만 보여줍니다 */
        <div className="mt-6">
          <DirectFormLink label="구글폼에서 참가 신청하기" />
          <p className="mt-3 text-sm text-ink-soft">
            신청 폼은 새 창에서 열립니다.
          </p>
        </div>
      )}
    </div>
  );
}
