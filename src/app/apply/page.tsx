import type { Metadata } from "next";
import { competition, formatKoreanDate } from "@/config/competition";
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
        description={`접수 기간: ${formatKoreanDate(
          registration.opensAt,
        )} ~ ${formatKoreanDate(registration.closesAt)}`}
      />

      <main id="main" className="flex-1">
        {/* ------------------------------------------------- 신청 전 확인 사항 */}
        <section className="py-9 sm:py-12">
          <div className={container}>
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">
              신청 전 확인해 주세요
            </h2>

            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-base font-bold text-brand-700">참가 대상</dt>
                <dd className="mt-1 text-base text-ink">
                  <ul className="space-y-1">
                    <li>· Junior 부문 — {eligibility.junior}</li>
                    <li>· Senior 부문 — {eligibility.senior}</li>
                    <li>· {eligibility.expandedJunior}</li>
                  </ul>
                </dd>
              </div>

              <div>
                <dt className="text-base font-bold text-brand-700">참가비</dt>
                <dd className="mt-1 text-base text-ink">
                  {feeKrw === 0
                    ? `무료입니다. ${competition.host} 예산으로 운영됩니다.`
                    : `${feeKrw.toLocaleString("ko-KR")}원`}
                </dd>
              </div>

              <div>
                <dt className="text-base font-bold text-brand-700">참가 규정</dt>
                <dd className="mt-1 text-base text-ink">
                  <ul className="space-y-1.5">
                    {eligibility.rules.map((rule) => (
                      <li key={rule}>· {rule}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------- 신청 폼 */}
        <section className="bg-paper-soft py-9 sm:py-12">
          <div className={container}>
            <ApplyForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
