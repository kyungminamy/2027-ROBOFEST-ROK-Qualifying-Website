import Link from "next/link";
import { competition } from "@/config/competition";
import { container } from "@/lib/layout";
import { ArrowRight } from "@/components/icons";

/* ============================================================================
 *  하위 페이지 공통 머리 부분 (네이비 띠)
 *
 *  ★ backHref 는 '상위 페이지'가 있을 때만 넣으세요. ★
 *
 *   홈으로 가는 길은 상단 메뉴(SiteNav)가 이미 담당합니다.
 *   그래서 여기에 또 '← 홈'을 넣으면 같은 링크가 두 번 나옵니다.
 *
 *   넣는 경우  : 종목 상세 → 종목 안내 (상위 페이지가 따로 있음)
 *   안 넣는 경우: 참가 신청, 종목 안내 (상위가 홈뿐이라 메뉴로 충분함)
 *
 *  ℹ️ 첫 화면(Hero)과 같은 격자무늬 바탕을 씁니다. 페이지를 옮겨도
 *     같은 대회 사이트 안에 있다는 느낌을 유지하기 위해서입니다.
 * ========================================================================== */

/** 머리띠 배경 사진 한 장 (config 의 headerImages 항목과 같은 모양) */
export type HeaderImage = {
  wide: string;
  small: string;
  position: string;
  /** 사진 위에 덮는 남색 막의 진하기 (0~1). 밝은 사진일수록 크게. */
  overlay: number;
  alt: string;
};

export function PageHeader({
  title,
  description,
  backHref,
  backLabel,
  image,
}: {
  title: string;
  /** 제목 아래 한 줄 설명 (없으면 생략) */
  description?: string;
  /** 상위 페이지 주소 (없으면 되돌아가기 링크를 표시하지 않습니다) */
  backHref?: string;
  backLabel?: string;
  /** 배경 사진 (없으면 남색 격자무늬가 나옵니다) */
  image?: HeaderImage;
}) {
  /* 사진 경로가 비어 있으면 사진 없이 격자무늬로 돌아갑니다.
     (경로가 잘못돼도 깨진 사진 대신 격자무늬가 보이게 하기 위함) */
  const hasImage =
    !!image && image.wide.trim() !== "" && image.small.trim() !== "";

  return (
    <section
      className={`${hasImage ? "header-photo" : "hero-field"} text-white`}
      /* 사진은 배경이라 화면 낭독기에 읽히지 않습니다.
         내용을 설명하는 사진이 아니라 분위기용이므로 이대로 둡니다. */
      style={
        hasImage
          ? ({
              "--header-image-wide": `url(${image.wide})`,
              "--header-image-small": `url(${image.small})`,
              "--header-pos": image.position,
              "--header-overlay": String(image.overlay),
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className={container}>
        {/* ★ 띠 높이 ★
            2026-08-03에 1.5배쯤 키웠습니다. 그 전에는 넓은 화면에서 199px
            이었는데, 아래 본문에 비해 눌린 느낌이 있었습니다.
            줄이려면 아래 py- 값을 낮추면 됩니다. */}
        <div className="py-16 sm:py-20 lg:py-24">
          {backHref && (
            <Link
              href={backHref}
              className="mb-3 inline-flex min-h-[44px] items-center gap-1.5 -ml-1 pl-1 pr-2 text-sm font-bold text-brand-200 transition-colors hover:text-white sm:text-base"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              {backLabel ?? competition.shortName}
            </Link>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl">{title}</h1>

          {/* ⚠️ 여기에 max-w-[..ch] 를 다시 넣지 마세요.
                 ch 는 영문 '0' 한 글자 너비 기준이라, 한글에서는 칸의
                 절반 남짓에서 줄이 바뀝니다. 줄 길이는 위 container 가
                 이미 정하고 있습니다. */}
          {description && (
            <p className="mt-4 text-base text-brand-100 sm:text-lg lg:text-xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
