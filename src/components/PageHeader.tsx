import Link from "next/link";
import { competition } from "@/config/competition";
import { container } from "@/lib/layout";

/* ============================================================================
 *  하위 페이지 공통 머리 부분 (파란 띠)
 *
 *  ★ 홈으로 돌아갈 길을 반드시 남겨 둡니다. ★
 *   아직 상단 메뉴가 없어서, 이 링크가 유일한 되돌아가는 길입니다.
 *   상단 메뉴를 만들면 backHref 를 그에 맞게 정리하세요.
 * ========================================================================== */

export function PageHeader({
  title,
  description,
  backHref = "/",
  backLabel = competition.shortName,
}: {
  title: string;
  /** 제목 아래 한 줄 설명 (없으면 생략) */
  description?: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section className="bg-brand-700 py-8 text-white sm:py-12">
      <div className={container}>
        <Link
          href={backHref}
          className="text-sm font-bold text-brand-200 sm:text-base"
        >
          ← {backLabel}
        </Link>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h1>
        {description && (
          <p className="mt-3 text-base sm:text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}
