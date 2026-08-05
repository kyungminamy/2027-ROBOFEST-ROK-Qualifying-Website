import type { Metadata } from "next";
import { competition, formatKoreanDateRange } from "@/config/competition";
import { ApplyForm } from "@/components/ApplyForm";
import { PageHeader } from "@/components/PageHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { container } from "@/lib/layout";

/* ============================================================================
 *  참가 신청 페이지 (/apply)
 *
 *  ★ 이 파일에는 날짜·자격·문구가 직접 적혀 있지 않습니다. ★
 *    모두 config/competition.ts 에서 읽어옵니다.
 *
 *  ⚠️ 주소를 '/apply' 로 정한 이유 (바꾸지 마세요)
 *     한글 주소('/신청')는 공문이나 카카오톡에 붙여넣을 때
 *     %EC%8B%A0... 처럼 깨져 보입니다. QR코드도 길어집니다.
 *     화면에 보이는 글자는 한글이므로 신청자는 영문 주소를 볼 일이 없습니다.
 * ========================================================================== */

export const metadata: Metadata = {
  title: "참가 신청",
  description: `${competition.shortName} 참가 신청 안내입니다. 접수 기간, 참가 자격, 신청 방법을 확인하세요.`,
};

export default function ApplyPage() {
  const { eligibility, registration } = competition;

  /* 참가비는 현재 0(무료)으로 고정되어 있어 타입이 '0'으로 좁혀집니다.
     유료로 바뀔 가능성을 남겨두기 위해 숫자로 넓혀서 씁니다. */
  const feeKrw: number = registration.feeKrw;

  return (
    <>
      {/* 대표 영역.
          홈으로 가는 링크는 넣지 않습니다 — 상단 메뉴가 이미 담당합니다. */}
      <PageHeader
        title="참가 신청"
        description={`접수 기간: ${formatKoreanDateRange(
          registration.opensAt,
          registration.closesAt,
        )}`}
        image={competition.headerImages.robot}
      />

      <main id="main" className="flex-1">
        {/* ------------------------------------------------- 신청 전 확인 사항
            ★ 상자 하나에 모두 들어 있습니다 (2026-08-05 부산광역시교육청 요청) ★

             예전에는 이 내용이 두 군데로 나뉘어 있었습니다.
               · 이 자리         — '신청 전 확인해 주세요' (참가 대상·참가비·규정)
               · 폼 바로 위      — '신청 전 안내' (개인정보·초상권 동의)
             이름이 비슷해서, 위쪽 상자만 읽고 아래 동의 안내는 못 보고
             지나치는 분이 있었습니다. 그래서 하나로 합쳤습니다.

            ⚠️ 이 상자를 폼 아래로 내리지 마세요 ⚠️
             개인정보 국외이전 안내는 **신청 폼보다 먼저** 보여야 합니다.
             (CLAUDE.md 의 개인정보 절 참고)

            ⚠️ 글은 전부 config/competition.ts 에서 옵니다.
             동의 문구를 고칠 때는 구글폼 마지막의 동의 항목도 같이 고쳐서
             양쪽 내용이 어긋나지 않게 하세요. */}
        <section className="py-12 sm:py-16">
          <div className={container}>
            <div className="overflow-hidden rounded-2xl border-2 border-brand-200 bg-paper">
              <h2 className="bg-brand-700 px-5 py-4 text-lg font-bold text-white sm:px-6 sm:text-xl">
                신청 전 확인해 주세요
              </h2>

              <dl className="px-5 py-1 sm:px-6">
                <div className="border-t border-brand-100 py-5 first:border-t-0">
                  <dt className="text-sm font-bold uppercase tracking-wider text-ink-soft">
                    참가 대상
                  </dt>
                  <dd className="mt-2 text-base text-ink">
                    {/* ⚠️ 2026-07-31: '초등학교 4학년 ~ 중학교 2학년
                           (RoboParade 전용)' 줄을 없앴습니다.
                           국내예선에서는 초4 이하를 받지 않습니다. */}
                    <ul className="ml-5 list-disc space-y-1 marker:text-brand-300">
                      <li>Junior 부문 — {eligibility.junior}</li>
                      <li>Senior 부문 — {eligibility.senior}</li>
                    </ul>
                  </dd>
                </div>

                <div className="border-t border-brand-100 py-5">
                  <dt className="text-sm font-bold uppercase tracking-wider text-ink-soft">
                    참가비
                  </dt>
                  {/* 무료라는 사실은 지도교사가 가장 먼저 확인하는 정보라
                      한 단계 크고 진하게 보여 줍니다. */}
                  <dd className="mt-2 text-base font-bold text-brand-900 sm:text-lg">
                    {feeKrw === 0
                      ? `무료입니다. ${competition.host} 예산으로 운영됩니다.`
                      : `${feeKrw.toLocaleString("ko-KR")}원`}
                  </dd>
                </div>

                <div className="border-t border-brand-100 py-5">
                  <dt className="text-sm font-bold uppercase tracking-wider text-ink-soft">
                    참가 규정
                  </dt>
                  <dd className="mt-2 text-base text-ink">
                    <ul className="ml-5 list-disc space-y-2 marker:text-brand-300">
                      {eligibility.rules.map((rule) => (
                        <li key={rule}>{rule}</li>
                      ))}
                    </ul>
                  </dd>
                </div>

                {/* ⚠️ 아래 두 항목은 법적으로 필요한 안내입니다. 지우지 마세요. */}
                <div className="border-t border-brand-100 py-5">
                  <dt className="text-sm font-bold uppercase tracking-wider text-ink-soft">
                    {registration.privacyNoticeTitle}
                  </dt>
                  <dd className="mt-2 text-base text-ink">
                    {registration.privacyNotice}
                  </dd>
                </div>

                <div className="border-t border-brand-100 py-5">
                  <dt className="text-sm font-bold uppercase tracking-wider text-ink-soft">
                    {registration.portraitRightsNoticeTitle}
                  </dt>
                  <dd className="mt-2 text-base text-ink">
                    {registration.portraitRightsNotice}
                  </dd>
                </div>
              </dl>

              <p className="border-t border-brand-100 px-5 py-4 text-sm text-ink-soft sm:px-6">
                {registration.consentNoticeFooter}
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- 신청 폼 */}
        <section className="bg-paper-soft py-12 sm:py-16">
          <div className={container}>
            <ApplyForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
