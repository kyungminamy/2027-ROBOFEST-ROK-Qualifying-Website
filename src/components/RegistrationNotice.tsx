"use client";

import Link from "next/link";
import {
  competition,
  formatKoreanDate,
  isRegistrationOpen,
} from "@/config/competition";
import { container } from "@/lib/layout";
import { useIsClient } from "@/lib/useIsClient";

/* ============================================================================
 *  접수 안내 — 접수 시작 전 / 접수 중 / 마감 세 가지 상태
 *
 *  ★ 왜 'use client' 인가 (지우지 마세요) ★
 *   지금이 접수 기간인지 판단하려면 '오늘'을 알아야 해서
 *   방문자의 브라우저에서 판단합니다.
 *   자세한 이유는 src/lib/useIsClient.ts 의 설명을 보세요.
 *
 *  ★ 날짜를 바꾸려면 config/competition.ts 의 registration 을 수정하세요. ★
 *
 *  ℹ️ 참가비 안내는 일부러 여기에 두지 않았습니다.
 *     신청 페이지(/apply)의 '신청 전 확인해 주세요'에 같은 내용이 있어서,
 *     첫 화면에서는 접수 시기만 알려 주는 편이 깔끔합니다.
 * ========================================================================== */

/** 'pending' = 아직 브라우저에서 계산이 끝나지 않은 상태 */
type State = "pending" | "before" | "open" | "closed";

/**
 * 신청 페이지(/apply)로 가는 버튼.
 *
 * 접수 중에는 진한 버튼(solid), 그 외에는 테두리 버튼(outline)입니다.
 * 색으로도 '지금 신청할 수 있는지'를 구분해 줍니다.
 */
function ApplyLink({
  label,
  variant,
}: {
  label: string;
  variant: "solid" | "outline";
}) {
  const base =
    "inline-flex w-full items-center justify-center rounded-lg px-6 py-4 text-base font-bold sm:w-auto sm:text-lg";
  const style =
    variant === "solid"
      ? "bg-brand-700 text-white"
      : "border-2 border-brand-300 bg-white text-brand-700";

  return (
    <Link href="/apply" className={`${base} ${style}`}>
      {label}
    </Link>
  );
}

function currentState(now: Date): Exclude<State, "pending"> {
  const opens = new Date(`${competition.registration.opensAt}T00:00:00+09:00`);
  if (now < opens) return "before";
  if (isRegistrationOpen(now)) return "open";
  return "closed";
}

export function RegistrationNotice() {
  const isClient = useIsClient();
  const state: State = isClient ? currentState(new Date()) : "pending";

  const { registration } = competition;
  const opensAt = formatKoreanDate(registration.opensAt);
  const closesAt = formatKoreanDate(registration.closesAt);

  /* 버튼은 신청 페이지(/apply)로 보냅니다. 구글폼은 그 페이지 안에 있습니다.
     구글폼 주소로 바로 보내지 않는 이유: 참가 자격과 팀 구성 규정을 먼저
     읽어야 잘못 신청하는 일이 줄어듭니다. */

  /* ★ 상태에 따라 '무게'가 다릅니다 (일부러 이렇게 했습니다) ★
     접수 전(pending·before)과 마감 후에는 눌러도 신청할 수 없습니다.
     그때 큰 상자를 띄우면 첫 화면에서 가장 눈에 띄는 자리를
     '지금은 아무것도 할 수 없다'는 안내가 차지하게 됩니다.
     그래서 그 기간에는 한 줄 안내처럼 조용히 두고,
     실제로 신청할 수 있는 '접수 중'에만 상자와 진한 버튼을 씁니다. */

  return (
    <section className="py-10 sm:py-14">
      <div className={container}>
        {state === "pending" && (
          /* 브라우저 계산 전 / 자바스크립트가 꺼진 경우에도
             '언제부터 언제까지'라는 사실은 그대로 보여 줍니다. */
          <div>
            <h2 className="text-lg font-bold text-brand-900 sm:text-xl">
              참가 접수
            </h2>
            <p className="mt-1 text-base text-ink">
              접수 기간: {opensAt} ~ {closesAt}
            </p>
            {/* 자바스크립트가 꺼진 브라우저에서도 신청 페이지로 갈 수
                있어야 합니다. 이 상태에서 유일한 통로입니다. */}
            <div className="mt-4">
              <ApplyLink label="참가 자격 · 신청 안내" variant="outline" />
            </div>
          </div>
        )}

        {state === "before" && (
          <div>
            <h2 className="text-lg font-bold text-brand-900 sm:text-xl">
              접수 예정
            </h2>
            <p className="mt-1 text-base text-ink">
              참가 접수는 {opensAt}에 시작합니다.
            </p>

            {/* ★ 접수 전에도 신청 페이지로 갈 길을 열어 둡니다 ★
                홍보는 8/24부터, 접수는 9/1부터 시작합니다.
                그 사이에 방문한 지도교사가 참가 자격과 팀 구성 규정을
                미리 확인할 수 있어야 합니다.

                다만 글씨는 '신청하기'가 아니라 '안내'입니다.
                아직 신청을 받지 않으므로, 눌렀을 때 폼이 나오는 것처럼
                보이면 안 됩니다. */}
            <div className="mt-4">
              <ApplyLink label="참가 자격 · 신청 안내" variant="outline" />
            </div>
          </div>
        )}

        {state === "open" && (
          /* ★ 접수 기간에만 나오는 화면입니다 ★
             실제로 신청할 수 있는 유일한 기간이므로, 첫 화면에서
             가장 눈에 띄어야 합니다. 상자와 진한 버튼을 빼지 마세요. */
          <div className="rounded-xl border-2 border-brand-200 bg-brand-50 p-5 sm:p-7">
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">
              접수 중
            </h2>
            <p className="mt-2 text-base text-ink sm:text-lg">
              {closesAt}까지 접수합니다.
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              종목별 정원제로 조기 마감될 수 있습니다.
            </p>

            <div className="mt-5">
              <ApplyLink label="참가 신청하기" variant="solid" />
            </div>
          </div>
        )}

        {state === "closed" && (
          <div>
            <h2 className="text-lg font-bold text-brand-900 sm:text-xl">
              접수 마감
            </h2>
            <p className="mt-1 text-base text-ink">
              {closesAt}에 참가 접수가 마감되었습니다.
            </p>
            {/* 마감 뒤에도 안내 페이지로 갈 길은 남겨 둡니다.
                '신청하기'가 아니라 '안내 보기'인 이유: 더 이상 신청할 수
                없으므로, 신청할 수 있는 것처럼 보이면 안 됩니다. */}
            <p className="mt-3">
              <Link
                href="/apply"
                className="text-base font-bold text-brand-700 underline"
              >
                참가 안내 보기 →
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
