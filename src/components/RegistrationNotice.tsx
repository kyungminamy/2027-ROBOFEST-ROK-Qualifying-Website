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
  const opens = new Date(
    `${competition.registration.opensAt}T00:00:00+09:00`,
  );
  if (now < opens) return "before";
  if (isRegistrationOpen(now)) return "open";
  return "closed";
}

export function RegistrationNotice() {
  const isClient = useIsClient();
  const state: State = isClient ? currentState(new Date()) : "pending";

  const { registration } = competition;

  /* 참가비는 현재 0(무료)으로 고정되어 있어 타입이 '0'으로 좁혀집니다.
     유료로 바뀔 가능성을 남겨두기 위해 숫자로 넓혀서 씁니다. */
  const feeKrw: number = registration.feeKrw;
  const isFree = feeKrw === 0;

  const opensAt = formatKoreanDate(registration.opensAt);
  const closesAt = formatKoreanDate(registration.closesAt);

  /* 이 버튼은 신청 페이지(/apply)로 보냅니다.
     구글폼 자체는 그 페이지 안에 들어 있습니다.

     여기서 구글폼 주소로 바로 보내지 않는 이유:
     참가 자격과 팀 구성 규정을 먼저 읽어야 잘못 신청하는 일이 줄어듭니다. */

  return (
    <section className="py-10 sm:py-14">
      <div className={container}>
        <div className="rounded-xl border-2 border-brand-200 bg-brand-50 p-5 sm:p-7">
          {/* ---------------------------------------------------- 참가비 (항상 강조) */}
          <p className="inline-flex items-center rounded-full bg-brand-700 px-4 py-1.5 text-sm font-bold text-white sm:text-base">
            {isFree ? "참가비 무료" : `참가비 ${feeKrw.toLocaleString("ko-KR")}원`}
          </p>
          {isFree && (
            <p className="mt-2 text-sm text-ink-soft">
              {competition.host} 예산으로 운영되어 참가비가 없습니다.
            </p>
          )}

          {/* ------------------------------------------------------- 상태별 안내 */}
          <div className="mt-5 sm:mt-6">
            {state === "pending" && (
              /* 브라우저 계산 전 / 자바스크립트가 꺼진 경우에도
                 '언제부터 언제까지'라는 사실은 그대로 보여 줍니다. */
              <>
                <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">
                  참가 접수
                </h2>
                <p className="mt-2 text-base text-ink sm:text-lg">
                  접수 기간: {opensAt} ~ {closesAt}
                </p>
                {/* 자바스크립트가 꺼진 브라우저에서도 신청 페이지로 갈 수
                    있어야 합니다. 이 상태에서 유일한 통로입니다. */}
                <div className="mt-5">
                  <ApplyLink label="참가 자격 · 신청 안내" variant="outline" />
                </div>
              </>
            )}

            {state === "before" && (
              <>
                <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">
                  접수 예정
                </h2>
                <p className="mt-2 text-base text-ink sm:text-lg">
                  {opensAt}부터 참가 접수를 시작합니다.
                </p>

                {/* ★ 접수 전에도 신청 페이지로 갈 길을 열어 둡니다 ★
                    홍보는 8/24부터, 접수는 9/1부터 시작합니다.
                    그 사이에 방문한 지도교사가 참가 자격과 팀 구성 규정을
                    미리 확인할 수 있어야 합니다.

                    다만 글씨는 '신청하기'가 아니라 '안내'입니다.
                    아직 신청을 받지 않으므로, 눌렀을 때 폼이 나오는 것처럼
                    보이면 안 됩니다. */}
                <div className="mt-5">
                  <ApplyLink label="참가 자격 · 신청 안내" variant="outline" />
                </div>
              </>
            )}

            {state === "open" && (
              <>
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
              </>
            )}

            {state === "closed" && (
              <>
                <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">
                  접수 마감
                </h2>
                <p className="mt-2 text-base text-ink sm:text-lg">
                  {closesAt}에 참가 접수가 마감되었습니다.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
