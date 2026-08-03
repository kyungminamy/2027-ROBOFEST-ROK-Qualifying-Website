import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categoryDetails,
  competition,
  divisionGradeRange,
  findCategory,
  type CategorySlug,
} from "@/config/competition";
import { PageHeader } from "@/components/PageHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { container } from "@/lib/layout";
import { ArrowRight, ExternalLink } from "@/components/icons";

/* ============================================================================
 *  종목 상세 페이지 (/categories/종목이름)
 *
 *  ★ 이 파일은 '틀'입니다. 글은 config/competition.ts 에 있습니다. ★
 *    · 종목 기본 정보 → categories
 *    · 상세 설명 글   → categoryDetails
 *    8개 종목이 모두 이 한 파일을 씁니다. 여기를 고치면 8개가 함께 바뀝니다.
 *
 *  ★★★ 순서를 바꾸지 마세요 ★★★
 *   1) 누가 나갈 수 있나
 *   2) 무엇을 하나
 *   3) 무엇을 준비해야 하나
 *   4) 어디서 규정을 확인하나
 *   학부모가 궁금한 순서대로 배치한 것입니다. (CLAUDE.md 참고)
 *
 *  ★★★ 용어 주의 ★★★
 *   UMC · BottleSumo · VCC 에 영문 Qualifier 를 쓰지 마세요.
 *   세계대회 진출은 '기회 제공' 까지만 씁니다. 진출 팀 수를 쓰지 마세요.
 *   자세한 이유는 docs/ROBOFEST-KR-CONTEXT.md 3.0 을 보세요.
 * ========================================================================== */

/** 8개 종목 주소를 미리 만들어 둡니다 (빠르고, 오타가 있으면 빌드가 실패) */
export function generateStaticParams() {
  return competition.categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) return {};

  return {
    title: `${category.name} ${category.nameKo}`,
    description: `${category.name}(${category.nameKo}) 참가 자격과 준비물 안내. ${category.summary}`,
  };
}

/* 본문 한 덩어리 — 제목이 붙은 구역
 *
 * ℹ️ 예전에는 제목 앞에 1·2·3·4 번호가 붙어 있었습니다. 2026-07-31에
 *    없앴습니다. 제목이 이미 '누가 나갈 수 있나요'처럼 질문 형태라서
 *    번호가 알려 주는 정보가 따로 없었기 때문입니다.
 *    ★ 구역의 순서 자체는 그대로 두세요 ★ (아래 순서 설명 참고) */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  /* 제목 '위' 여백을 아래보다 넓게 둡니다. 그래야 제목이 아래 내용에
     붙어 보여서, 어디까지가 한 덩어리인지 눈에 바로 들어옵니다. */
  return (
    <section className="border-t border-brand-100 pt-11 pb-8 first:border-t-0 sm:pt-14 sm:pb-10">
      <h2 className="text-2xl text-brand-900 sm:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** 라벨 + 내용 한 줄 */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-brand-100 py-4 last:border-b-0">
      <dt className="text-sm font-bold uppercase tracking-wider text-ink-soft">
        {label}
      </dt>
      <dd className="mt-1.5 text-base text-ink">{children}</dd>
    </div>
  );
}

/** 점으로 시작하는 목록 */
function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="ml-5 list-disc space-y-2 marker:text-brand-300">
      {items.map((line) => (
        <li key={line} className="text-base text-ink">
          {line}
        </li>
      ))}
    </ul>
  );
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = findCategory(slug);

  /* 없는 종목 주소로 들어오면 404 를 보여 줍니다.
     (예: 오래된 안내문에 실린 주소가 바뀐 경우) */
  if (!category) notFound();

  const detail = categoryDetails[category.slug as CategorySlug];

  return (
    <>
      <PageHeader
        title={`${category.name} ${category.nameKo}`}
        description={category.summary}
        backHref="/categories"
        backLabel="종목 안내"
        image={competition.headerImages.compass}
      />

      <main id="main" className="flex-1">
        <div className={container}>
          {/* ============================================ 1) 누가 나갈 수 있나 */}
          <Section title="누가 나갈 수 있나요">
            <dl>
              <Row label="참가 부문">
                <ul className="space-y-1.5">
                  {category.divisions.map((division) => {
                    const grade = divisionGradeRange(division);
                    return (
                      <li key={division}>
                        <span className="font-bold">{division}</span>
                        {grade && (
                          <span className="text-ink-soft"> — {grade}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Row>

              <Row label="팀 인원">
                학생 최대 {category.maxTeamSize}명, 성인 지도자 1명입니다.
                지도자 한 명이 여러 팀을 지도할 수 있습니다.
              </Row>

              <Row label="난이도">{category.difficulty}</Row>
            </dl>
          </Section>

          {/* ================================================ 2) 무엇을 하나 */}
          <Section title="무엇을 하는 종목인가요">
            <div className="space-y-3">
              {detail.whatItIs.map((line) => (
                <p key={line} className="text-base text-ink sm:text-lg">
                  {line}
                </p>
              ))}
            </div>

            {detail.howItRuns.length > 0 && (
              <div className="mt-7 rounded-2xl bg-paper-soft p-5 sm:p-6">
                <p className="text-sm font-bold text-brand-700">
                  경기 진행 방식
                </p>
                <div className="mt-3">
                  <Bullets items={detail.howItRuns} />
                </div>
              </div>
            )}
          </Section>

          {/* ========================================== 3) 무엇을 준비해야 하나 */}
          <Section title="무엇을 준비해야 하나요">
            <dl>
              <Row label="로봇 · 키트">{detail.prepare.robotKit}</Row>
              <Row label="노트북 등 장비">{detail.prepare.computer}</Row>

              <Row label="대회 전에 준비할 것">
                <Bullets items={detail.prepare.beforeEvent} />
              </Row>

              <Row label="대회 당일 가져올 것">
                <Bullets items={detail.prepare.onSite} />
              </Row>
            </dl>

            {detail.notes.length > 0 && (
              <div className="mt-7 rounded-2xl border-2 border-brand-200 bg-brand-50 p-5 sm:p-6">
                <p className="text-sm font-bold text-brand-900">
                  꼭 확인해 주세요
                </p>
                <div className="mt-3">
                  <Bullets items={detail.notes} />
                </div>
              </div>
            )}
          </Section>

          {/* ========================================= 4) 어디서 규정을 확인하나 */}
          <Section title="공식 규정은 어디서 보나요">
            <p className="text-base text-ink sm:text-lg">
              이 페이지는 이해를 돕기 위한 요약입니다. 규정은 ROBOFEST
              본부에서 정하며 바뀔 수 있으므로, 최종 확인은 반드시 아래 공식
              페이지에서 해 주세요.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {/* ⚠️ 외부 사이트이므로 새 창에서 엽니다 */}
              <a
                href={category.rulesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-brand-700 px-7 text-base font-bold text-white transition-colors hover:bg-brand-800 sm:text-lg"
              >
                {category.name} 공식 규정 보기
                <ExternalLink className="h-5 w-5" />
              </a>
              <a
                href={competition.links.generalRulesPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border-2 border-brand-200 bg-paper px-7 text-base font-bold text-brand-700 transition-colors hover:border-brand-400 sm:text-lg"
              >
                공통 규정집 (PDF)
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>

            <p className="mt-3 text-sm text-ink-soft">
              두 링크 모두 ROBOFEST 본부 공식 사이트이며 영문입니다. 새 창에서
              열립니다.
            </p>

            {/* 세계대회 진출 안내 — 문구는 config 에서 관리합니다.
                ⚠️ 진출 팀 수를 적지 마세요. 아직 정해지지 않았습니다. */}
            <div className="mt-7 rounded-2xl bg-paper-soft p-5 sm:p-6">
              <p className="text-sm font-bold text-brand-700">
                세계대회 진출 안내
              </p>
              <p className="mt-2 text-base text-ink">
                {competition.worldChampionship.advancementNotice}
              </p>
              {/* ⚠️ year 를 다시 쓰지 마세요. period 에 이미 연도가 들어 있어
                     '2027 세계대회는 2027년 5월...' 처럼 중복됩니다. */}
              <p className="mt-2 text-sm text-ink-soft">
                세계대회는 {competition.worldChampionship.period}{" "}
                {competition.worldChampionship.location}에서 열립니다. 국내예선
                장소인 부산과 다른 곳입니다.
              </p>
            </div>
          </Section>

          {/* ------------------------------------------------------ 이동 링크 */}
          <div className="border-t border-brand-100 py-10 sm:py-12">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/apply"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-accent-600 px-7 text-base font-bold text-white shadow-lg shadow-accent-600/20 transition-colors hover:bg-accent-700 sm:text-lg"
              >
                참가 신청 안내
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex min-h-[52px] items-center justify-center rounded-lg border-2 border-brand-200 bg-paper px-7 text-base font-bold text-brand-700 transition-colors hover:border-brand-400 sm:text-lg"
              >
                다른 종목 보기
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
