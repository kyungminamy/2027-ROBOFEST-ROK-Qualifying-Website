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
            199px → 298px(1.5배) → 395px(다시 1.3배)로 두 번 키웠습니다.
            줄이려면 아래 py- 값을 낮추면 됩니다.

            ⚠️ 휴대폰은 일부러 덜 키웠습니다. 작은 화면(320×568)에서
               넓은 화면과 같은 비율로 키우면 띠 하나가 화면의 60%를
               차지해, 정작 읽어야 할 내용이 화면 밖으로 밀립니다. */}
        <div className="py-22 sm:py-28 lg:py-36">
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
          {description ? (
            <p className="mt-4 text-base text-brand-100 sm:text-lg lg:text-xl">
              {description}
            </p>
          ) : (
            /* ★★★ 설명이 없어도 그 자리는 비워 둡니다 (2026-08-12) ★★★
             *
             *  머리띠 높이는 '안에 든 내용'이 정합니다. 그래서 설명 줄이
             *  없으면 그 줄(28px)과 위 여백(mt-4 = 16px)만큼, 즉 44px 이
             *  짧아집니다. 실제로 '오시는 길'(/venue)에서 설명을 빼자
             *  그 화면만 350px 이 되어 다른 화면(394px)과 어긋났습니다.
             *
             *  ★ 왜 min-h-[394px] 같은 고정 높이를 쓰지 않았나 ★
             *    394px 은 넓은 화면에서 한 번 잰 값일 뿐입니다. 머리띠는
             *    화면 폭에 따라 위아래 여백(py-22 / py-28 / py-36)도,
             *    글씨 크기도 달라져서 높이가 구간마다 다릅니다. 고정값을
             *    넣으면 한 구간만 맞고 나머지는 그대로 어긋납니다.
             *
             *  → 그래서 **설명 줄과 똑같은 상자**를 글자만 안 보이게 해서
             *    놓아 둡니다. 클래스가 위와 한 글자도 다르지 않으니 어느
             *    화면 폭에서도 저절로 높이가 같아집니다.
             *
             *  ⚠️ 위 <p> 의 클래스를 고치면 이쪽도 똑같이 고치세요.
             *     (색 text-brand-100 만 뺐습니다 — 어차피 안 보입니다)
             *
             *  ℹ️ visibility:hidden(=invisible) 이라 자리는 차지하되 화면
             *     낭독기는 읽지 않습니다. display:none(=hidden) 으로
             *     바꾸면 자리를 차지하지 않아 아무 소용이 없습니다. */
            <p
              aria-hidden="true"
              className="invisible mt-4 text-base sm:text-lg lg:text-xl"
            >
              &nbsp;
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
