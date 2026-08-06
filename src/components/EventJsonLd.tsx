import { competition } from "@/config/competition";

/* ============================================================================
 *  검색엔진에게 '이건 행사입니다'라고 알려 주는 정보 (구조화 데이터)
 *
 *  ★ 화면에는 아무것도 보이지 않습니다. ★
 *   페이지 소스에만 들어가는 정보입니다. 네이버·구글이 이걸 읽고
 *   검색 결과에 행사 이름·날짜·장소·참가비를 함께 보여 줄 수 있습니다.
 *
 *  ★ 글은 전부 config/competition.ts 에서 옵니다. ★
 *   날짜나 장소를 고치면 여기도 자동으로 따라갑니다.
 *   이 파일에 날짜를 직접 적지 마세요.
 *
 *  ⚠️ 참가비가 0원(무료)이라는 것도 여기에 들어갑니다.
 *     유료로 바뀌면 config 의 feeKrw 만 고치면 됩니다.
 * ========================================================================== */

export function EventJsonLd() {
  const { dates, registration, venue, seo } = competition;

  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: competition.name,
    description: seo.description,
    url: seo.siteUrl,

    /* 대회 이틀 — 시작일과 종료일 */
    startDate: dates.day1,
    endDate: dates.day2,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",

    location: {
      "@type": "Place",
      name: venue.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: venue.postalAddress.street,
        addressLocality: venue.postalAddress.locality,
        addressRegion: venue.postalAddress.region,
        postalCode: venue.postalAddress.postalCode,
        addressCountry: venue.postalAddress.country,
      },
    },

    organizer: {
      "@type": "Organization",
      name: competition.host,
      url: competition.links.busanEducationOffice,
    },

    /* 참가 신청 — 무료이고, 접수 기간이 정해져 있습니다 */
    offers: {
      "@type": "Offer",
      price: registration.feeKrw,
      priceCurrency: "KRW",
      availability: "https://schema.org/InStock",
      url: `${seo.siteUrl}/apply`,
      validFrom: registration.opensAt,
      validThrough: registration.closesAt,
    },
  };

  return (
    <script
      type="application/ld+json"
      /* 이 값은 우리가 config 에서 만든 것이라 안전합니다.
         바깥에서 받은 글을 여기에 넣지 마세요. */
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
