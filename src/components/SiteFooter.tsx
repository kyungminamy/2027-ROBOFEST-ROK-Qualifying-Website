import { competition } from "@/config/competition";
import { container } from "@/lib/layout";
import { ExternalLink } from "@/components/icons";

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
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
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
    <footer className="bg-brand-900 py-12 text-white sm:py-16">
      <div className={container}>
        <p className="text-lg font-bold sm:text-xl">{competition.shortName}</p>

        {/* ------------------------------------------------------------ 문의처 */}
        <div className="mt-8">
          {/* ★ 아래 항목들보다 크게 유지하세요 ★
                 이 글자는 아래 목록(카카오톡·이메일·전화)이 무엇에 대한
                 것인지 알려 주는 제목입니다. 아래 항목이 text-sm/base 이므로
                 제목은 한 단계 위인 text-base/lg 를 씁니다.
                 제목이 내용보다 작으면 제목으로 보이지 않습니다. */}
          <p className="text-base font-bold text-white sm:text-lg">문의</p>

          <dl className="mt-3 space-y-3">
            <Row label="카카오톡">
              {kakaoUrl ? (
                /* 채널 주소가 있을 때만 링크로 만듭니다.
                   ★ 채널 이름만 덩그러니 두지 마세요 ★
                     이름만 있으면 '무엇을 하라는 것인지'가 없습니다.
                     '채널로 문의해 주세요'까지 있어야 문의 창구로 읽힙니다.
                     아래 검색 안내 문구와 짝을 이루는 문장입니다. */
                <>
                  <a
                    href={kakaoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
                  >
                    {contact.kakao.searchName}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  {" 채널로 문의해 주세요."}
                </>
              ) : (
                /* 주소가 없으면 검색해서 찾도록 안내만 합니다.
                   눌러도 아무 일 없는 링크를 만들지 않기 위해서입니다.

                   왼쪽 라벨이 이미 '카카오톡'이므로 문장에서는 반복하지
                   않습니다.

                   ⚠️ '를' 앞에 공백을 넣지 마세요. 한국어 조사는 앞말에
                      붙여 씁니다. ('럭스로보 를' 이 아니라 '럭스로보를')
                   ⚠️ 이름이 자음으로 끝나면 '를'을 '을'로 바꿔 주세요. */
                <>
                  <span className="font-bold">{contact.kakao.searchName}</span>
                  를 검색해 주세요.
                </>
              )}
            </Row>

            {email && (
              <Row label="이메일">
                {/* 휴대폰에서 누르면 메일 앱이 바로 열립니다 */}
                <a
                  href={`mailto:${email}`}
                  className="underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
                >
                  {email}
                </a>
              </Row>
            )}

            {phone && (
              <Row label="전화">
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="tabular underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
                >
                  {phone}
                </a>
              </Row>
            )}

            <Row label="운영 시간">{contact.hours}</Row>
          </dl>
        </div>

        {/* ------------------------------------------------------------ 기관 */}
        <dl className="mt-8 space-y-3 border-t border-white/15 pt-6">
          <Row label="주최·주관">{competition.host}</Row>
          <Row label="운영·공인">{competition.operators.join(" · ")}</Row>
        </dl>
      </div>
    </footer>
  );
}
