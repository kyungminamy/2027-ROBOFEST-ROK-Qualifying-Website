import type { Metadata } from "next";
import { competition, venueDisplayName } from "@/config/competition";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { container } from "@/lib/layout";
import { ExternalLink } from "@/components/icons";

/* ============================================================================
 *  장소 (/venue)
 *
 *  ★ 이 파일에는 장소 정보가 직접 적혀 있지 않습니다. ★
 *    모두 config/competition.ts 의 venue 에서 읽어옵니다 (directions 포함).
 *
 *  【 장소가 확정된 뒤에 할 일 — 순서대로 】
 *   1. venue.address 에 도로명 주소를 입력합니다
 *      → 주소 칸이 화면에 나타납니다
 *   2. venue.mapUrl 에 네이버·카카오 지도 링크를 입력합니다
 *      → '지도 보기' 버튼이 화면에 나타납니다 (비어 있으면 버튼이 없습니다)
 *   3. venue.isConfirmed 를 true 로 바꿉니다
 *      → 장소 이름 뒤의 '(예정)'이 사라지고, 맨 위 '예정' 안내문도 사라집니다
 *   4. 오시는 길 사진이 있으면 public/venue/ 폴더에 올리고,
 *      venue.directions 의 image 에 '/venue/파일이름' 을 적습니다
 *   5. venue.directions 의 description 에 길 안내 글을 적습니다
 *      → 비어 있는 항목은 '추후 공지'로 표시됩니다
 *
 *  ⚠️ 없는 정보는 화면에 만들어 내지 않습니다.
 *     주소·지도·사진·길 안내는 config 에 값이 있을 때만 나타납니다.
 *     눌러도 아무 일 없는 버튼이나 깨진 사진이 생기지 않도록 한 것입니다.
 * ========================================================================== */

export const metadata: Metadata = {
  title: "장소",
  description: `${competition.shortName}의 대회 장소와 오시는 길 안내입니다.`,
};

export default function VenuePage() {
  const { venue } = competition;

  /* 아래 값들은 지금 빈 문자열('')로 고정되어 있어 타입이 ''로 좁혀집니다.
     나중에 값이 채워질 것을 전제로 문자열로 넓혀서 씁니다.
     (config 의 feeKrw 를 다루는 방식과 같습니다) */
  const address: string = venue.address;
  const mapUrl: string = venue.mapUrl;

  return (
    <>
      <PageHeader
        title="장소"
        description={`${venueDisplayName()}에서 열립니다.`}
        image={competition.headerImages.compass}
      />

      <main id="main" className="flex-1">
        {/* ------------------------------------------- 장소 확정 전 안내 (조건부) */}
        {!venue.isConfirmed && (
          <section className="pt-12 pb-2 sm:pt-14 sm:pb-4">
            <div className={container}>
              <div className="rounded-2xl border-2 border-brand-200 bg-brand-50 p-6 sm:p-7">
                <p className="text-lg font-bold text-brand-900 sm:text-xl">
                  장소는 아직 확정 전입니다
                </p>
                <p className="mt-2 text-base text-ink">
                  대회는 부산 지역에서 열릴 예정입니다. 다만 정확한 장소는
                  협의가 진행 중이어서 바뀔 수 있습니다.
                </p>
                <p className="mt-2 text-base text-ink">
                  정확한 위치와 오시는 길은 확정되는 대로 이 페이지에서
                  안내하겠습니다. 숙소나 교통편을 미리 예약하실 때에는 이 점을
                  고려해 주세요.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------- 장소 */}
        <section className="py-12 sm:py-16">
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">장소</h2>

            <dl className="mt-6">
              <div className="border-b border-brand-100 py-3">
                <dt className="text-sm font-bold text-brand-700">장소명</dt>
                <dd className="mt-1 text-base text-ink sm:text-lg">
                  {venueDisplayName()}
                </dd>
              </div>

              <div className="border-b border-brand-100 py-3">
                <dt className="text-sm font-bold text-brand-700">주소</dt>
                <dd className="mt-1 text-base text-ink sm:text-lg">
                  {/* 주소가 있을 때만 실제 주소를 보여 줍니다 */}
                  {address ? (
                    address
                  ) : (
                    <span className="text-ink-soft">
                      주소는 장소 확정 후 공지 예정입니다.
                    </span>
                  )}
                </dd>
              </div>
            </dl>

            {/* ★ 지도 링크가 없으면 버튼을 아예 만들지 않습니다 ★
                눌러도 아무 일 없는 버튼을 두지 않기 위한 규칙입니다. */}
            {mapUrl && (
              <div className="mt-6">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-accent-600 px-7 text-base font-bold text-white shadow-lg shadow-accent-600/20 transition-colors hover:bg-accent-700 sm:w-auto sm:text-lg"
                >
                  지도 보기
                  <ExternalLink className="h-5 w-5" />
                </a>
                <p className="mt-2 text-sm text-ink-soft">
                  새 창에서 열립니다.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* --------------------------------------------------------- 오시는 길 */}
        <section className="bg-paper-soft py-12 sm:py-16">
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">오시는 길</h2>
            <p className="mt-3 text-base text-ink-soft">
              오시는 방법별로 안내를 준비하고 있습니다.
            </p>

            <div className="mt-8 space-y-9">
              {venue.directions.map((way) => {
                /* 위와 같은 이유로 문자열로 넓혀서 씁니다 */
                const image: string = way.image;
                const imageAlt: string = way.imageAlt;
                const description: string = way.description;

                return (
                  /* Reveal 은 <div> 를 그대로 그리므로 예전 <div> 자리에
                     그대로 끼워 넣었습니다. 화면 구조가 바뀌지 않습니다. */
                  <Reveal key={way.key}>
                    <h3 className="text-lg font-bold text-brand-900">
                      {way.label}
                    </h3>

                    {/* 사진이 있을 때만 넣습니다. 없으면 빈 칸도 만들지 않습니다. */}
                    {image && (
                      // eslint-disable-next-line @next/next/no-img-element -- next/image 는 설정이 필요해 비개발자가 유지하기 어렵습니다. public 폴더의 사진만 쓰므로 기본 img 로 충분합니다.
                      <img
                        src={image}
                        alt={imageAlt || way.label}
                        loading="lazy"
                        className="mt-3 h-auto w-full rounded-xl border border-brand-200"
                      />
                    )}

                    {description ? (
                      <p className="mt-3 text-base text-ink sm:text-lg">
                        {description}
                      </p>
                    ) : (
                      <p className="mt-2 text-base text-ink-soft">추후 공지</p>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- 주차 안내 */}
        <section className="py-12 sm:py-16">
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">주차 안내</h2>
            <p className="mt-4 text-base text-ink sm:text-lg">
              {venue.parkingNote}
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
