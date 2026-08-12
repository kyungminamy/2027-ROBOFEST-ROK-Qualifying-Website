import type { Metadata } from "next";
import { Fragment } from "react";
import { competition } from "@/config/competition";
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
 *   2. venue.mapImage 에 지도 그림을, venue.mapUrl 에 길찾기 링크를
 *      입력합니다 → 주소 아래에 지도와 '길찾기' 줄이 나타납니다
 *      (mapImage.src 가 비어 있으면 지도 자리가 통째로 없습니다)
 *   3. venue.isConfirmed 를 true 로 바꿉니다
 *      → 맨 위 '장소는 아직 확정 전입니다' 안내 박스가 사라집니다
 *      (장소 이름은 이미 '(예정)' 없이 나옵니다 — 2026-08-04 담당자 요청)
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
  /* 이 화면의 대표 주소. www 주소나 ?뒤에 붙는 값이 달라도
     검색엔진이 "원래 주소는 이것"이라고 알 수 있게 합니다. */
  alternates: { canonical: "/venue" },
};

export default function VenuePage() {
  const { venue } = competition;

  /* 아래 값들은 지금 빈 문자열('')로 고정되어 있어 타입이 ''로 좁혀집니다.
     나중에 값이 채워질 것을 전제로 문자열로 넓혀서 씁니다.
     (config 의 feeKrw 를 다루는 방식과 같습니다) */
  const address: string = venue.address;
  const mapUrl: string = venue.mapUrl;
  /* 지도 그림. src 가 비어 있으면 지도 자리를 통째로 그리지 않습니다. */
  const mapImage: { src: string; alt: string; width: number; height: number } =
    venue.mapImage;

  return (
    <>
      {/* ℹ️ 2026-08-12: 머리말 제목을 '장소' → '오시는길' 로 바꾸고,
             그 아래 한 줄 설명('○○○에서 열립니다.')을 없앴습니다
             (담당자 요청). 상단 메뉴의 이름도 같이 바꿨습니다 —
             config 의 nav 를 보세요.

             ℹ️ 장소 이름은 아래 '장소' 구역의 '장소명' 줄에 그대로
                나옵니다. 머리말에서만 빠진 것이라 사라진 정보는 없습니다.

             ⚠️ 설명을 다시 넣게 되면 이름을 여기에 직접 적지 마세요.
                config 의 venue.name 에서 가져와야 합니다. 두 곳에 적으면
                한쪽만 고쳐집니다. */}
      <PageHeader
        /* ⚠️ 여기는 '오시는 길'(띄어쓰기 있음), 상단 메뉴는 '오시는길'
              (붙여 씀) 입니다. 서로 다른 것이 맞습니다 — 2026-08-12
              담당자가 그렇게 정했습니다. 한쪽에 맞춰 고치지 마세요. */
        title="오시는 길"
        /* 배경 사진을 바꾸려면 이 한 단어만 바꾸면 됩니다.
           고를 수 있는 값은 config 의 headerImages 에 있습니다. */
        image={competition.headerImages.compassMap}
      />

      <main id="main" className="flex-1">
        {/* ℹ️ 2026-08-11: 여기 있던 '장소는 아직 확정 전입니다' 안내 상자를
               담당자 요청으로 통째로 없앴습니다 (옅은 파란 상자였습니다).

               ⚠️ 없어진 말 중에 다른 곳에 없는 것이 두 가지 있습니다.
                 ① '대회는 부산 지역에서 열릴 예정입니다' — 이 페이지에서
                    지역을 말하던 유일한 문장이었습니다.
                 ② '숙소나 교통편을 미리 예약하실 때에는 이 점을 고려해
                    주세요' — 미리 예약하지 말라는 유일한 경고였습니다.
               다시 넣고 싶으면 git 기록에서 이 커밋 직전을 보세요.

               ℹ️ '아직 확정 전'이라는 사실 자체는 아래 세 곳에 그대로
                  남아 있습니다 — 머리말, '장소명' 줄, '주소' 줄.
                  venue.isConfirmed 값은 이제 화면 어디에도 쓰이지 않습니다. */}

        {/* ------------------------------------------------------------- 장소 */}
        <section className="py-12 sm:py-16">
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">장소</h2>

            {/* ------------------------------ 장소명·주소 + 사진 (나란히)

                ★★★ 사진이 글 '옆'이지 '위'가 아닙니다 (2026-08-12 담당자 요청) ★★★

                  전에는 사진이 제목 바로 아래 화면 전체 폭으로 깔려 있었고,
                  이름과 주소는 그 아래에 있었습니다. 들어오자마자 큰 사진부터
                  보여서, 정작 어디인지 말하기도 전에 사진이 너무 앞선다는
                  지적이 있었습니다. 그래서
                    · 글(장소명·주소)을 왼쪽에 먼저 두고
                    · 사진을 오른쪽으로 옮겨 작게 줄였습니다.

                  ⚠️ 순서를 바꾸지 마세요. 아래 코드에서 <dl>(글)이 <figure>
                     (사진)보다 먼저 나오는 것은 일부러입니다. 휴대폰에서는
                     두 칸이 위아래로 쌓이는데, 그때도 '이름·주소 먼저,
                     사진 나중'이 되어야 합니다. 화면 낭독기가 읽는 순서도
                     같습니다.

                ★ 두 칸 폭 ★
                  글 칸은 남는 만큼(1fr), 사진 칸은 18rem(288px) 고정입니다.
                  본문 폭이 720px 이므로 글 칸은 400px 쯤 됩니다.
                  ⚠️ 사진 칸을 넓히면 주소 '부산광역시 북구 시랑로132번길 88'
                     이 두 줄로 접힙니다.

                ★ 작게 만든 것이 오히려 선명합니다 ★
                  사진 원본이 400px 인데 전에는 730px 로 늘려 보여 줘서
                  흐릿했습니다. 이제 288px 로 줄여서 보여 주므로 원본보다
                  작습니다. 늘리지 않으니 또렷합니다.
                  ⚠️ 사진 칸을 400px 보다 넓히면 다시 흐려집니다.

                원본은 image/과기대 사진.jpg, 화면에 나가는 파일은
                public/venue/campus.jpg 입니다. 사진을 바꾸려면 config 의
                venue.photo 만 고치면 됩니다.

                ⚠️ srcSet 이 없습니다. 사진이 400×238 로 작아서 큰 것·작은
                   것으로 나눌 이유가 없기 때문입니다.

                ⚠️ next/image 를 쓰지 않는 이유는 다른 화면과 같습니다 —
                   설정이 필요해 비개발자가 유지하기 어렵습니다. */}
            <div className="mt-6 grid items-start gap-6 sm:grid-cols-[1fr_18rem] sm:gap-8">
              <dl>
                <div className="border-b border-brand-100 py-3">
                  <dt className="text-sm font-bold text-brand-700">장소명</dt>
                  <dd className="mt-1 text-base text-ink sm:text-lg">
                    {/* ℹ️ 2026-08-11: 장소가 확정되어 이름이 다시 나옵니다.
                           2026-08-05 ~ 08-11 사이에는 미확정이라 이 자리에
                           '장소명은 확정 후 공지 예정입니다'가 나왔습니다.
                           이름은 config 의 venue.name 에서 옵니다. */}
                    {venue.name}
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

              {/* ⚠️ 이 <figure> 는 위 <dl> 보다 **뒤에** 있어야 합니다.
                     휴대폰에서 위아래로 쌓일 때 '이름·주소 먼저, 사진
                     나중'이 되도록 한 것입니다. 위 설명을 보세요.

                  ★ max-w-[25rem] 은 사진 원본 크기(400px)입니다 ★
                    넓은 화면에서는 오른쪽 칸이 288px 이라 이 값이 쓰이지
                    않습니다. 두 칸이 위아래로 쌓이는 좁은 화면(640px 미만)
                    에서만 쓰입니다. 이게 없으면 화면 폭이 500~640px 일 때
                    사진이 원본보다 커지면서 흐려집니다.
                    ⚠️ 사진을 바꾸면 이 값도 새 사진의 가로 크기로 고치세요. */}
              <figure className="max-w-[25rem]">
                {/* eslint-disable-next-line @next/next/no-img-element -- 위 설명 참고 */}
                <img
                  src={venue.photo.src}
                  alt={venue.photo.alt}
                  width={venue.photo.width}
                  height={venue.photo.height}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full rounded-2xl border border-brand-100"
                />
                {/* ℹ️ 2026-08-11: 사진 아래 설명(figcaption)을 담당자 요청으로
                       없앴습니다. '부산과학기술대학교'라고만 적혀 있었는데,
                       바로 옆 '장소명' 줄이 같은 말을 하고 있었습니다.

                       ⚠️ /about 의 사진에는 설명이 그대로 있습니다. 그쪽은
                          세계대회 사진이라 '부산 대회장이 아니다'라는 것을
                          설명이 알려 줍니다. 여기와 사정이 다릅니다. */}
              </figure>
            </div>

            {/* ------------------------------------------------------- 지도
                ℹ️ 2026-08-12: 이 자리는 하루 사이에 세 번 바뀌었습니다.
                   그림 → 구글 <iframe>(움직이는 지도) → **다시 그림**.
                   마지막이 담당자가 고른 형태입니다. 자리는 계속
                   그대로(주소 아래)입니다.

                ★ 지도도 길찾기도 이제 네이버입니다 ★
                  왜 '움직이는 지도'를 쓰지 않는지는 config 의 venue.mapImage
                  위에 길게 적어 두었습니다. 한 줄로 줄이면: 구글은 계정
                  없이 넣을 수 있지만 한국에서 길찾기가 안 되고, 네이버·
                  카카오는 길찾기가 되지만 넣으려면 개발자 계정과 키가
                  필요합니다. 그래서 보여 주기는 그림으로, 길찾기는 링크로
                  나눴습니다.
                  ⚠️ 아래 네이버 링크를 지우지 마세요. 지우면 실제로 찾아오는
                     방법이 사라집니다.

                ★ 그림이라서 항상 보입니다 ★
                  우리 파일(public/venue/map.png)이라 남의 서버가 막혀도,
                  자바스크립트가 꺼져 있어도 똑같이 보입니다. 학교
                  인터넷에서 특히 중요합니다.

                ⚠️ width·height 를 지우지 마세요. 그림이 늦게 뜰 때 그만큼
                   자리를 미리 비워 두는 값입니다. 없으면 그림이 뜨는 순간
                   아래 글이 덜컥 밀려 내려갑니다.

                ★ 폭은 본문 폭에 꽉 채웁니다 (2026-08-12 담당자 요청) ★
                  전에는 max-w-[42rem](672px) 로 묶여 있어서, 바로 위 사진의
                  오른쪽 끝(720px)보다 48px 짧았습니다. 두 오른쪽 끝이
                  어긋나 보여서 없앴습니다.
                  ⚠️ 다시 max-w 를 붙이면 그 어긋남이 돌아옵니다.
                  (원본이 1010px 이라 720px 로 줄여 보여 주는 것입니다.
                   늘리는 것이 아니라 줄이는 것이라 흐려지지 않습니다)

                ⚠️ next/image 를 쓰지 않는 이유는 위 장소 사진과 같습니다 —
                   설정이 필요해 비개발자가 유지하기 어렵습니다. */}
            {mapImage.src && (
              <div className="mt-6 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element -- 위 설명 참고 */}
                <img
                  src={mapImage.src}
                  alt={mapImage.alt}
                  width={mapImage.width}
                  height={mapImage.height}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full rounded-lg border border-brand-200"
                />

                {mapUrl && (
                  <p className="mt-3 text-sm text-ink-soft">
                    {/* ★ 이 링크가 '길찾기' 담당입니다 ★
                        위 지도는 그림이라 누를 수 없습니다. */}
                    길찾기는{" "}
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-brand-700 underline hover:text-accent-600"
                    >
                      네이버 지도
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    에서 확인하실 수 있습니다. 새 창에서 열립니다.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ----------------------------------------------------------- 교통안내
            ℹ️ 2026-08-12: 제목을 '오시는 길' → '교통안내' 로 바꾸고, 그
               아래 '오시는 방법별로 안내를 준비하고 있습니다.' 한 줄을
               없앴습니다 (담당자 요청).

               '오시는길'은 이제 페이지 전체의 이름(머리말·상단 메뉴)이라,
               그 안의 구역이 같은 이름을 또 쓰면 어느 쪽을 가리키는지
               헷갈립니다. 그래서 이 구역만 '교통안내'로 좁혔습니다. */}
        <section className="bg-paper-soft py-12 sm:py-16">
          <div className={container}>
            <h2 className="text-2xl text-brand-900 sm:text-3xl">교통안내</h2>

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

                    {/* 표 (버스 노선, 출발지별 소요시간).
                        config 의 rows 가 비어 있으면 아무것도 그리지 않습니다.

                        ★ 왜 문장이 아니라 표인가 (2026-08-11 담당자 요청) ★
                          버스 번호가 한 줄에 13개입니다. 문장에 섞어 놓으면
                          자기가 타는 번호가 있는지 눈으로 찾기 어렵습니다.
                          대학 누리집도 같은 내용을 표로 보여 줍니다.

                        모양은 종목 비교표(/categories)를 따랐습니다 — 테두리,
                        머리 칸 배경, 둥근 모서리가 같습니다.

                        ⚠️ 다만 두 가지는 다릅니다 (2026-08-11 담당자 요청).
                          ① 머리 칸 글씨가 15px 입니다 (비교표는 12px).
                             본문 글씨(14px)보다 1px 큽니다.
                          ② 칸 사이에 세로줄이 있고 글자가 가운데 정렬입니다.
                             (비교표는 세로줄 없이 왼쪽 정렬)
                          비교표도 같은 모양으로 맞추려면 그쪽 Th/Td 를
                          고치세요. 지금은 이 화면만 이렇습니다. */}
                    {way.rows.length > 0 && (
                      <div className="mt-4 overflow-x-auto rounded-2xl border border-brand-200 bg-paper">
                        {/* ★ table-fixed 인 이유 (2026-08-11) ★
                            자동 폭에 맡기면 칸 너비가 글자 길이를 따라갑니다.
                            그래서 '사상 시외버스터미널'이 있는 첫째 쌍만
                            넓어지고 '구포역'이 있는 셋째 쌍은 좁아져,
                            출발지끼리의 간격이 278·262·178px 처럼 제각각이
                            됐습니다. table-fixed + 아래 폭 지정으로 쌍마다
                            정확히 같은 너비를 갖게 합니다.
                            ⚠️ table-fixed 를 빼면 다시 어긋납니다.

                            ★ min-w 를 지우지 마세요 (쌍이 둘 이상일 때) ★
                              table-fixed 는 좁은 화면에서 표를 화면 폭에
                              억지로 욱여넣습니다. 휴대폰(390px)에서 실제로
                              해 보니 값 칸이 37px 이 되어 '20분'이
                              '2/0/분' 세 줄로 쪼개졌습니다. 최소 폭을 정해
                              두면 대신 표가 좌우로 밀립니다 — 종목
                              비교표(/categories)와 같은 방식입니다. */}
                        <table
                          className={`w-full table-fixed border-collapse ${
                            way.rowsColumns > 1 ? "min-w-[38rem]" : ""
                          }`}
                        >
                          <caption className="sr-only">
                            {way.label} — {way.rowsHeading.label}별{" "}
                            {way.rowsHeading.value}
                          </caption>
                          <thead>
                            <tr>
                              {/* 한 줄에 여러 쌍이 들어가면 열 제목도 그만큼
                                  되풀이됩니다 (대학 누리집과 같은 모양). */}
                              {Array.from({ length: way.rowsColumns }).map(
                                (_, i) => (
                                  <Fragment key={i}>
                                    {/* 폭은 여기 머리 칸에서 정합니다
                                        (table-fixed 는 첫 줄의 폭을 따릅니다).
                                        한 쌍 = 전체의 1/쌍수. 그 안에서
                                        이름 55 : 값 45 로 나눕니다.

                                        ⚠️ 값 칸을 더 좁히지 마세요. 2:1 로
                                           두었더니 머리글 '소요시간'이
                                           '소요시/간' 두 줄로 쪼개졌습니다
                                           (15px 로 키운 뒤). 대신 이름 칸이
                                           좁아져 '사상 시외버스터미널'이 두
                                           줄이 되는데, 띄어쓰기에서 나뉘어
                                           읽는 데 지장이 없습니다.

                                        쌍이 하나뿐이면(버스 번호) 값 쪽이
                                        훨씬 길어지므로 반대로 잡습니다. */}
                                    <th
                                      scope="col"
                                      style={{
                                        width:
                                          way.rowsColumns === 1
                                            ? "20%"
                                            : `${(100 / way.rowsColumns) * 0.55}%`,
                                      }}
                                      className="border-b-2 border-r border-brand-200 bg-brand-50 px-3.5 py-3 text-center text-[15px] font-bold text-brand-800 last:border-r-0"
                                    >
                                      {way.rowsHeading.label}
                                    </th>
                                    <th
                                      scope="col"
                                      style={{
                                        width:
                                          way.rowsColumns === 1
                                            ? "80%"
                                            : `${(100 / way.rowsColumns) * 0.45}%`,
                                      }}
                                      className="border-b-2 border-r border-brand-200 bg-brand-50 px-3.5 py-3 text-center text-[15px] font-bold text-brand-800 last:border-r-0"
                                    >
                                      {way.rowsHeading.value}
                                    </th>
                                  </Fragment>
                                ),
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {/* config 의 rows 를 rowsColumns 개씩 잘라 한 줄로
                                만듭니다. 3 이면 세 쌍이 한 줄에 들어갑니다. */}
                            {Array.from(
                              {
                                length: Math.ceil(
                                  way.rows.length / way.rowsColumns,
                                ),
                              },
                              (_, line) =>
                                way.rows.slice(
                                  line * way.rowsColumns,
                                  line * way.rowsColumns + way.rowsColumns,
                                ),
                            ).map((line) => (
                              <tr key={line[0].label}>
                                {line.map((row) => (
                                  <Fragment key={row.label}>
                                    {/* scope="row": 화면 낭독기가 '김해 — 20분'
                                        처럼 짝지어 읽어 줍니다. 지우지 마세요. */}
                                    {/* ⚠️ whitespace-nowrap 을 붙이지 마세요.
                                           칸 너비가 고정이라, 긴 이름
                                           ('사상 시외버스터미널')이 칸 밖으로
                                           삐져나갑니다. 지금은 띄어쓰기에서
                                           두 줄로 나뉩니다. */}
                                    <th
                                      scope="row"
                                      className="border-b border-r border-brand-100 px-3.5 py-3 text-center align-middle text-sm font-bold text-brand-800 last:border-r-0"
                                    >
                                      {row.label}
                                    </th>
                                    {/* tabular: 숫자라 폭을 고르게 맞춥니다.
                                        ⚠️ 여기에 w-full 을 붙이지 마세요.
                                           한 줄에 쌍이 셋일 때, 맨 앞 칸
                                           하나가 남는 폭을 전부 가져가서
                                           첫째 쌍과 둘째 쌍 사이만 크게
                                           벌어집니다. (2026-08-11 확인) */}
                                    <td className="tabular border-b border-r border-brand-100 px-3.5 py-3 text-center align-middle text-sm text-ink last:border-r-0">
                                      {row.value}
                                    </td>
                                  </Fragment>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
