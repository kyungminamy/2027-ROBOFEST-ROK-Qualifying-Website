import Link from "next/link";
import { homeSection, proseWidth } from "@/lib/layout";
import { ArrowRight } from "@/components/icons";

/* ============================================================================
 *  첫 화면(홈)의 '한 구역' 틀
 *
 *  홈은 각 구역이 그 주제를 짧게 요약하고, 자세한 내용은 해당 페이지로
 *  넘기는 '길잡이' 역할을 합니다. 그래서 구역마다 모양이 같아야
 *  방문자가 '아, 또 하나의 구역이구나' 하고 바로 알아봅니다.
 *
 *  ★ 홈에 구역을 추가할 때는 이 틀을 쓰세요. ★
 *    <HomeSection title="..." lead="..." moreHref="/..." moreLabel="...">
 *      내용
 *    </HomeSection>
 *
 *  【 위아래 여백을 크게 잡은 이유 】
 *   구역 사이가 좁으면 여러 구역이 한 덩어리처럼 보여서, 어디서 주제가
 *   바뀌는지 알기 어렵습니다. 넉넉한 여백 자체가 '여기서 다른 이야기가
 *   시작된다'는 신호입니다. 줄이지 마세요.
 *
 *  【 배경색 】
 *   tone="soft" 를 주면 옅은 파랑 배경이 됩니다.
 *   흰색 → 옅은 파랑 → 흰색 순으로 번갈아 놓아야 구역이 구분됩니다.
 * ========================================================================== */

export function HomeSection({
  title,
  lead,
  moreHref,
  moreLabel,
  tone = "paper",
  children,
}: {
  title: string;
  /** 제목 아래 한두 줄 설명 (없으면 생략) */
  lead?: string;
  /** 자세히 보기로 갈 페이지 (없으면 링크를 만들지 않습니다) */
  moreHref?: string;
  moreLabel?: string;
  tone?: "paper" | "soft";
  children: React.ReactNode;
}) {
  return (
    <section
      className={`py-20 sm:py-28 lg:py-32 ${
        tone === "soft" ? "bg-paper-soft" : "bg-paper"
      }`}
    >
      <div className={homeSection}>
        <h2 className="text-3xl text-brand-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
          {title}
        </h2>

        {lead && (
          <p className={`mt-4 text-base text-ink sm:mt-5 sm:text-lg ${proseWidth}`}>
            {lead}
          </p>
        )}

        <div className="mt-10 sm:mt-12">{children}</div>

        {/* 자세히 보기 — 홈은 요약만 하고 자세한 내용은 각 페이지에 있습니다.
            주소가 없으면 링크를 아예 만들지 않습니다.
            (눌러도 아무 일 없는 링크를 두지 않기 위한 규칙) */}
        {moreHref && moreLabel && (
          <p className="mt-10 sm:mt-12">
            <Link
              href={moreHref}
              className="group inline-flex min-h-[52px] items-center gap-2 rounded-lg border-2 border-brand-200 bg-paper px-6 text-base font-bold text-brand-700 transition-colors hover:border-brand-400 hover:text-accent-600 sm:text-lg"
            >
              {moreLabel}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
