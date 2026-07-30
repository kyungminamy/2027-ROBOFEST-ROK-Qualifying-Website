"use client";

import {
  applyFormDirectUrl,
  applyFormEmbedUrl,
  competition,
  formatKoreanDate,
  hasApplyForm,
  isRegistrationOpen,
} from "@/config/competition";
import { useIsClient } from "@/lib/useIsClient";

/* ============================================================================
 *  참가 신청 — 구글폼을 페이지 안에 넣어 보여줍니다
 *
 *  ★ 왜 'use client' 인가 (지우지 마세요) ★
 *   지금이 접수 기간인지 판단하려면 '오늘'을 알아야 해서
 *   방문자의 브라우저에서 판단합니다.
 *   자세한 이유는 src/lib/useIsClient.ts 의 설명을 보세요.
 *
 *  ★ 폼 안쪽은 우리가 꾸밀 수 없습니다 ★
 *   구글폼은 다른 사이트(구글)의 화면을 창처럼 끼워 넣는 방식입니다.
 *   그래서 글꼴·색·줄바꿈 설정이 폼 안쪽에는 적용되지 않습니다.
 *   폼 안쪽 질문을 바꾸려면 구글폼 편집 화면에서 바꾸세요.
 *
 *  ★ 주소·높이·안내 문구는 config/competition.ts 에서 바꾸세요 ★
 * ========================================================================== */

/** 접수 상태 — 'pending' 은 아직 브라우저에서 계산이 끝나지 않은 상태 */
type State = "pending" | "before" | "open" | "closed";

function currentState(now: Date): Exclude<State, "pending"> {
  const opens = new Date(`${competition.registration.opensAt}T00:00:00+09:00`);
  if (now < opens) return "before";
  if (isRegistrationOpen(now)) return "open";
  return "closed";
}

/** 안내 상자 — 접수 전/마감/준비 중 상황에서 같은 모양으로 보여줍니다 */
function NoticeBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border-2 border-brand-200 bg-brand-50 p-5 sm:p-7">
      <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">{title}</h2>
      <div className="mt-2 text-base text-ink sm:text-lg">{children}</div>
    </div>
  );
}

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
  const isClient = useIsClient();
  const state: State = isClient ? currentState(new Date()) : "pending";

  const { registration } = competition;
  const opensAt = formatKoreanDate(registration.opensAt);
  const closesAt = formatKoreanDate(registration.closesAt);

  const embedUrl = applyFormEmbedUrl();

  /* ---------------------------------------------------------- 접수 기간 안내 */

  /* 브라우저 계산 전에는 날짜만 알려 줍니다.
     이 상태에서 폼을 미리 보여주면, 접수 시작 전에도 폼이 잠깐
     보였다 사라지는 일이 생깁니다. */
  if (state === "pending") {
    return (
      <NoticeBox title="참가 접수">
        <p>
          접수 기간: {opensAt} ~ {closesAt}
        </p>
      </NoticeBox>
    );
  }

  if (state === "before") {
    return (
      <NoticeBox title="접수 예정">
        <p>{opensAt}부터 참가 접수를 시작합니다.</p>
        <p className="mt-1 text-sm text-ink-soft">
          접수가 시작되면 이 페이지에서 바로 신청하실 수 있습니다.
        </p>
      </NoticeBox>
    );
  }

  if (state === "closed") {
    return (
      <NoticeBox title="접수 마감">
        <p>{closesAt}에 참가 접수가 마감되었습니다.</p>
        <p className="mt-1 text-sm text-ink-soft">
          문의사항은 아래 문의처로 연락해 주세요.
        </p>
      </NoticeBox>
    );
  }

  /* ------------------------------------------------------------- 접수 중 */

  /* 구글폼 주소가 아직 비어 있는 경우.
     config 의 registration.formUrl 에 주소를 넣으면 폼이 나타납니다. */
  if (!hasApplyForm() || !embedUrl) {
    return (
      <NoticeBox title="접수 링크 준비 중">
        <p>참가 신청 폼을 준비하고 있습니다. 잠시 후 다시 확인해 주세요.</p>
      </NoticeBox>
    );
  }

  return (
    <div>
      {/* ⚠️ 법적으로 필요한 안내입니다. 폼보다 먼저 보여야 합니다. */}
      <div className="rounded-xl border-2 border-brand-200 bg-brand-50 p-5 sm:p-6">
        <p className="text-sm font-bold text-brand-900 sm:text-base">
          개인정보 처리 안내
        </p>
        <p className="mt-2 text-sm text-ink sm:text-base">
          {registration.privacyNotice}
        </p>
      </div>

      <p className="mt-6 text-base text-ink sm:text-lg">
        {closesAt}까지 접수합니다.
      </p>
      <p className="mt-1 text-sm text-ink-soft">
        종목별 정원제로 조기 마감될 수 있습니다.
      </p>

      {/* --------------------------------------------------------- 폼 본체 */}
      {registration.applyMode === "embed" ? (
        <>
          <div className="mt-5 overflow-hidden rounded-xl border border-brand-200 bg-white">
            <iframe
              src={embedUrl}
              /* 높이는 config 의 embedHeightPx 로 조절합니다.
                 구글 정책상 자동으로 맞출 수 없습니다. */
              height={registration.embedHeightPx}
              className="block w-full"
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
