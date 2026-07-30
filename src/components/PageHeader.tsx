import Link from "next/link";
import { competition } from "@/config/competition";
import { container } from "@/lib/layout";

/* ============================================================================
 *  하위 페이지 공통 머리 부분 (파란 띠)
 *
 *  ★ backHref 는 '상위 페이지'가 있을 때만 넣으세요. ★
 *
 *   홈으로 가는 길은 상단 메뉴(SiteNav)가 이미 담당합니다.
 *   그래서 여기에 또 '← 홈'을 넣으면 같은 링크가 두 번 나옵니다.
 *
 *   넣는 경우  : 종목 상세 → 종목 안내 (상위 페이지가 따로 있음)
 *   안 넣는 경우: 참가 신청, 종목 안내 (상위가 홈뿐이라 메뉴로 충분함)
 * ========================================================================== */

export function PageHeader({
  title,
  description,
  backHref,
  backLabel,
}: {
  title: string;
  /** 제목 아래 한 줄 설명 (없으면 생략) */
  description?: string;
  /** 상위 페이지 주소 (없으면 되돌아가기 링크를 표시하지 않습니다) */
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section className="bg-brand-700 py-8 text-white sm:py-12">
      <div className={container}>
        {backHref && (
          <Link
            href={backHref}
            className="text-sm font-bold text-brand-200 sm:text-base"
          >
            ← {backLabel ?? competition.shortName}
          </Link>
        )}
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h1>
        {description && (
          <p className="mt-3 text-base sm:text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}
