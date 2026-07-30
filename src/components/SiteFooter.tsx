import { competition } from "@/config/competition";
import { container } from "@/lib/layout";

/* ============================================================================
 *  꼬리말 — 주최·주관 / 운영·공인 기관
 *
 *  ⚠️ config 에는 '주최'와 '주관'이 host 한 항목으로 되어 있습니다.
 *     부산광역시교육청이 주최와 주관을 함께 맡기 때문입니다.
 *     기관이 나뉘면 config 에 항목을 추가한 뒤 여기에 한 줄 더 넣으세요.
 *
 *  ★ 기관명을 바꾸려면 config/competition.ts 를 수정하세요. ★
 * ========================================================================== */

/** 꼬리말 한 줄 (라벨 + 기관명) */
function OrgRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <dt className="shrink-0 text-sm font-bold text-brand-200 sm:w-24 sm:text-base">
        {label}
      </dt>
      <dd className="text-sm sm:text-base">{value}</dd>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-brand-900 py-9 text-white sm:py-12">
      <div className={container}>
        <p className="text-base font-bold sm:text-lg">
          {competition.shortName}
        </p>

        <dl className="mt-5 space-y-2.5">
          <OrgRow label="주최·주관" value={competition.host} />
          <OrgRow label="운영·공인" value={competition.operators.join(" · ")} />
        </dl>
      </div>
    </footer>
  );
}
