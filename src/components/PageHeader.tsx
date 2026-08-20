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
  /** 사진 위에 덮는 남색 막의 진하기 (0~1). 밝은 사진일수록 크게.
   *  ★ 768px 이상에서는 이 값이 **왼쪽(글자 쪽)의 진하기**입니다. ★
   *    오른쪽으로 갈수록 저절로 옅어져 화면 끝에서 사라집니다.
   *    그 규칙은 globals.css 에 첫 화면과 공통으로 한 곳에 있습니다. */
  overlay: number;
  /** 막이 옅어지기 시작하는 자리 (선택). 안 쓰면 globals.css 의 기본값
   *  `calc(50% + 384px)` — 글이 놓이는 칸의 오른쪽 끝 — 을 씁니다.
   *
   *  ⚠️ 2026-08-18 현재 **이 값을 쓰는 사진은 없습니다.** '참가 신청'이
   *     하루 썼다가 다시 뺐습니다. 지우지 않고 남겨 둔 것은 되돌릴
   *     여지를 두기 위해서입니다.
   *  ⚠️ 앞당길수록 글자 뒤가 밝아집니다. 쓰게 되면 반드시 명도 대비를
   *     다시 재세요 (제목 3:1, 설명 줄 4.5:1). */
  overlayEnd?: string;
  alt: string;
};

export function PageHeader({
  title,
  description,
  backHref,
  backLabel,
  image,
  solid = false,
  titleIcon,
}: {
  title: string;
  /** 제목 아래 한 줄 설명 (없으면 생략) */
  description?: string;
  /** 상위 페이지 주소 (없으면 되돌아가기 링크를 표시하지 않습니다) */
  backHref?: string;
  backLabel?: string;
  /** 배경 사진 (없으면 남색 격자무늬가 나옵니다) */
  image?: HeaderImage;
  /** true 면 사진 없이 브랜드 남색 단색 띠로 그립니다 (2026-08-14) */
  solid?: boolean;
  /** 제목 **앞**에 붙는 작은 그림의 경로 (2026-08-20)
   *
   *  ★ 지금 쓰는 화면은 '자주 묻는 질문'(/faq) 하나뿐입니다. ★
   *    넘기지 않으면 예전과 똑같이 제목만 나옵니다.
   *    그 화면의 묶음 제목(신청과 비용 등)도 **맨 앞**에 그림을 붙입니다.
   *    두 자리가 같아야 화면을 내려가는 동안 그림이 같은 세로줄에 놓입니다.
   *
   *  ⚠️ 머리띠는 **남색 바탕에 흰 글자**입니다. 검정 그림을 넘기면 거의
   *     보이지 않습니다. 흰색으로 다시 뽑은 파일을 넘기세요
   *     (만드는 방법은 image/README.md).
   *  ℹ️ 크기는 제목 글자 크기를 따라갑니다(높이 1em). 화면이 넓어져 제목이
   *     커지면 그림도 같이 커집니다.
   *  ℹ️ 경로가 비어 있으면 그림 없이 제목만 나옵니다. */
  titleIcon?: string;
}) {
  /* 사진 경로가 비어 있으면 사진 없이 격자무늬로 돌아갑니다.
     (경로가 잘못돼도 깨진 사진 대신 격자무늬가 보이게 하기 위함) */
  const hasImage =
    !solid && !!image && image.wide.trim() !== "" && image.small.trim() !== "";

  /* ★ 배경은 셋 중 하나입니다 ★
       solid    → bg-brand-700 단색. 종목 상세 화면이 씁니다(담당자 요청).
                  종목 카드의 제목 띠와 **같은 색**이라, 목록에서 카드를
                  누르고 들어왔을 때 색이 이어집니다.
       사진 있음 → header-photo (사진 + 남색 막)
       그 밖    → hero-field (brand-900 단색. 첫 화면과 같은 바탕)
     ⚠️ solid 는 다른 화면에 영향이 없습니다. 넘기지 않으면 예전 그대로입니다.

     ℹ️ 2026-08-18: 사진마다 막 모양을 달리 하던 `overlayShape`(스포트라이트)
        갈래를 지웠습니다. 담당자 요청으로 '참가 신청'도 다른 화면과 같은
        막으로 돌아와, 사진이 있는 화면은 예외 없이 header-photo 하나입니다. */
  const background = solid
    ? "bg-brand-700"
    : hasImage
      ? "header-photo"
      : "hero-field";

  return (
    <section
      className={`${background} text-white`}
      /* 사진은 배경이라 화면 낭독기에 읽히지 않습니다.
         내용을 설명하는 사진이 아니라 분위기용이므로 이대로 둡니다. */
      style={
        hasImage
          ? ({
              "--header-image-wide": `url(${image.wide})`,
              "--header-image-small": `url(${image.small})`,
              "--header-pos": image.position,
              "--header-overlay": String(image.overlay),
              /* 사진이 따로 정했을 때만 덮어씁니다.
                 안 정했으면 globals.css 의 기본값이 그대로 쓰입니다. */
              ...(image.overlayEnd
                ? { "--overlay-end": image.overlayEnd }
                : {}),
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className={container}>
        {/* ★ 띠 높이 ★
            199px → 298px(1.5배) → 395px(다시 1.3배)로 두 번 키웠습니다.
            줄이려면 아래 py- 값을 낮추면 됩니다.
            (고정 높이는 쓰지 않습니다. 안에 든 내용이 높이를 정합니다 —
             아래 '설명이 없어도 자리는 비워 둔다' 설명을 보세요.)

            ⚠️ 휴대폰은 일부러 덜 키웠습니다. 작은 화면(320×568)에서
               넓은 화면과 같은 비율로 키우면 띠 하나가 화면의 60%를
               차지해, 정작 읽어야 할 내용이 화면 밖으로 밀립니다.

            ★★★ 단색(solid) 일 때는 여백이 절반입니다 (2026-08-14) ★★★
              사진이 있을 때의 큰 여백은 **사진을 보여 주기 위한 자리**
              였습니다. 배경이 단색이 되자 그 자리가 그냥 남색 덩어리가
              되어 화면의 절반을 차지했습니다(담당자 지적).
              그래서 solid 일 때만 py- 값을 정확히 절반으로 씁니다.
                사진   py-22 / sm:py-28 / lg:py-36  (88 / 112 / 144px)
                단색   py-11 / sm:py-14 / lg:py-18  (44 /  56 /  72px)
              ⚠️ 사진 쪽 값을 함께 줄이지 마세요. 나머지 일곱 화면은
                 사진이 보일 자리가 필요합니다. */}
        <div
          className={
            solid ? "py-11 sm:py-14 lg:py-18" : "py-22 sm:py-28 lg:py-36"
          }
        >
          {backHref && (
            <Link
              href={backHref}
              className="mb-3 inline-flex min-h-[44px] items-center gap-1.5 -ml-1 pl-1 pr-2 text-sm font-bold text-brand-200 transition-colors hover:text-white sm:text-base"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              {backLabel ?? competition.shortName}
            </Link>
          )}

          {/* ★ 제목 앞의 작은 그림 ★ (titleIcon 을 넘긴 화면만)
                · 높이 1em → 제목 글자와 같은 크기. 화면이 넓어져 제목이
                  커지면 그림도 같이 커집니다 (담당자 요청).
                · align-[-0.15em] → 한글 글자의 위아래에 눈으로 맞춘 값입니다.
                  baseline 그대로 두면 그림이 글자보다 높이 떠 보입니다.
                · alt="" → 바로 옆 글자가 같은 말을 하므로 낭독기는 건너뜁니다.
                  ⚠️ 여기에 설명을 넣으면 제목이 두 번 읽힙니다.
                · <h1> 안에 두어 글자처럼 흐릅니다. flex 로 바꾸지 마세요 —
                  제목이 두 줄이 되는 좁은 화면에서 모양이 깨집니다.
                ⚠️ next/image 를 쓰지 않는 이유는 다른 그림들과 같습니다 —
                   설정이 필요해 비개발자가 유지하기 어렵습니다. */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl">
            {titleIcon && (
              /* eslint-disable-next-line @next/next/no-img-element -- 위 설명 참고 */
              <img
                src={titleIcon}
                alt=""
                width={50}
                height={50}
                className="mr-[0.4em] inline-block h-[1em] w-[1em] align-[-0.15em]"
              />
            )}
            {title}
          </h1>

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
