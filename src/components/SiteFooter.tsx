import { competition } from "@/config/competition";
import { container } from "@/lib/layout";

/* ============================================================================
 *  꼬리말 — 문의처 / 주최·주관 / 운영·공인 기관
 *
 *  ★ 내용을 바꾸려면 config/competition.ts 를 수정하세요. ★
 *    · 문의처 → contact
 *    · 기관명 → host, operators
 *
 *  ⚠️ config 에는 '주최'와 '주관'이 host 한 항목으로 되어 있습니다.
 *     부산광역시교육청이 주최와 주관을 함께 맡기 때문입니다.
 *     기관이 나뉘면 config 에 항목을 추가한 뒤 여기에 한 줄 더 넣으세요.
 *
 *  꼬리말에는 메뉴를 두지 않습니다.
 *  상단 메뉴가 자바스크립트 없이도 열리므로 (SiteNav 참고)
 *  같은 링크를 아래에 한 번 더 둘 필요가 없습니다.
 * ========================================================================== */

/** 꼬리말 한 줄 (라벨 + 내용) */
function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <dt className="shrink-0 text-sm font-bold text-brand-200 sm:w-24 sm:text-base">
        {label}
      </dt>
      <dd className="text-sm sm:text-base">{children}</dd>
    </div>
  );
}

export function SiteFooter() {
  const { contact } = competition;

  /* 비어 있을 수 있는 값들은 문자열로 넓혀서 씁니다.
     값이 없으면 그 줄을 아예 만들지 않습니다. */
  const email: string = contact.email;
  const phone: string = contact.phone;
  const kakaoUrl: string = contact.kakao.channelUrl;

  return (
    <footer className="bg-brand-900 py-9 text-white sm:py-12">
      <div className={container}>
        <p className="text-base font-bold sm:text-lg">
          {competition.shortName}
        </p>

        {/* ------------------------------------------------------------ 문의처 */}
        <div className="mt-6">
          <p className="text-sm font-bold text-white sm:text-base">문의</p>

          <dl className="mt-2.5 space-y-2.5">
            <Row label="카카오톡">
              {kakaoUrl ? (
                /* 채널 주소가 있을 때만 링크로 만듭니다 */
                <a
                  href={kakaoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {contact.kakao.searchName}
                </a>
              ) : (
                /* 주소가 없으면 검색해서 찾도록 안내만 합니다.
                   눌러도 아무 일 없는 링크를 만들지 않기 위해서입니다.

                   ⚠️ '를' 앞에 공백을 넣지 마세요. 한국어 조사는 앞말에
                      붙여 씁니다. ('Luxrobo 를' 이 아니라 'Luxrobo를') */
                <>
                  카카오톡에서{" "}
                  <span className="font-bold">{contact.kakao.searchName}</span>
                  를 검색해 주세요.
                </>
              )}
            </Row>

            {email && (
              <Row label="이메일">
                {/* 휴대폰에서 누르면 메일 앱이 바로 열립니다 */}
                <a href={`mailto:${email}`} className="underline">
                  {email}
                </a>
              </Row>
            )}

            {phone && (
              <Row label="전화">
                <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="underline">
                  {phone}
                </a>
              </Row>
            )}

            <Row label="운영 시간">{contact.hours}</Row>
          </dl>
        </div>

        {/* ------------------------------------------------------------ 기관 */}
        <dl className="mt-6 space-y-2.5 border-t border-brand-800 pt-5">
          <Row label="주최·주관">{competition.host}</Row>
          <Row label="운영·공인">{competition.operators.join(" · ")}</Row>
        </dl>
      </div>
    </footer>
  );
}
