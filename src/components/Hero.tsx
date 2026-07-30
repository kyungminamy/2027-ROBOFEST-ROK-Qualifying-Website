import {
  competition,
  formatKoreanDate,
  venueDisplayName,
} from "@/config/competition";
import { DdayBadge } from "@/components/DdayBadge";
import { container } from "@/lib/layout";

/* ============================================================================
 *  첫 화면 대표 영역 — 대회명, 일정, 장소, 남은 날짜
 *
 *  ★ 글을 바꾸려면 config/competition.ts 를 수정하세요. ★
 * ========================================================================== */

export function Hero() {
  const { dates } = competition;

  return (
    <section className="bg-brand-700 py-10 text-white sm:py-16">
      <div className={container}>
        {/* 주최 기관 */}
        <p className="text-sm font-bold text-brand-200 sm:text-base">
          {competition.host}
        </p>

        {/* 대회 정식 명칭 */}
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">
          {competition.name}
        </h1>

        {/* 일정 · 장소 */}
        <dl className="mt-6 space-y-1.5 text-base sm:mt-7 sm:text-lg">
          <div className="flex flex-col sm:flex-row sm:gap-3">
            <dt className="shrink-0 font-bold text-brand-200 sm:w-16">일정</dt>
            <dd>
              {formatKoreanDate(dates.day1)}
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> ~ </span>
              <span className="sm:hidden">~ </span>
              {formatKoreanDate(dates.day2)}
            </dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-3">
            <dt className="shrink-0 font-bold text-brand-200 sm:w-16">장소</dt>
            <dd>{venueDisplayName()}</dd>
          </div>
        </dl>

        {/* 남은 날짜 — 방문자의 브라우저에서 계산합니다 (DdayBadge 주석 참고) */}
        <div className="mt-7 sm:mt-8">
          <DdayBadge />
        </div>
      </div>
    </section>
  );
}
