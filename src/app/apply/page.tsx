import type { Metadata } from "next";
import { competition } from "@/config/competition";
import { ApplyForm } from "@/components/ApplyForm";
import { ApplyHero } from "@/components/ApplyHero";
import { ChevronDown } from "@/components/icons";
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
  /* 이 화면의 대표 주소. www 주소나 ?뒤에 붙는 값이 달라도
     검색엔진이 "원래 주소는 이것"이라고 알 수 있게 합니다. */
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  const { eligibility, registration } = competition;

  /* 참가비는 현재 0(무료)으로 고정되어 있어 타입이 '0'으로 좁혀집니다.
     유료로 바뀔 가능성을 남겨두기 위해 숫자로 넓혀서 씁니다. */
  const feeKrw: number = registration.feeKrw;

  return (
    <>
      {/* ------------------------------------------------------- 머리띠
          ★ 이 화면만 쓰는 전용 머리띠입니다 (2026-08-19 담당자 요청) ★
            남색 단색 + 낮은 높이 + D-day 배지. 공용 PageHeader 를 쓰지 않는
            이유와 되돌릴 때 알아야 할 것은 src/components/ApplyHero.tsx 맨
            위에 모두 적어 두었습니다.
          ⚠️ 여기에 <PageHeader ... /> 를 다시 넣지 마세요. 다른 일곱 화면과
             같은 사진 머리띠로 돌아가면, 정작 읽어야 할 아래 상자가 다시
             첫 화면 밖으로 밀려납니다.
          ⚠️ 머리띠 안에 '신청 폼 바로가기' 단추를 만들지 마세요 —
             확인 사항을 건너뛰는 지름길이 됩니다.
          홈으로 가는 링크는 넣지 않습니다 — 상단 메뉴가 이미 담당합니다. */}
      <ApplyHero />

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

              {/* ------------------------------------------- ① 반려될 수 있는 항목
                  ★ 왜 이 넷이 맨 위인가 (2026-08-19 담당자 요청) ★
                    아래 접힌 글은 대부분 '대회 규정'입니다. 신청서를 **반려**
                    시킬 수 있는 것은 이 넷뿐이라, 지도교사가 가장 먼저 봐야
                    합니다.
                  ⚠️ 카드를 늘리지 마세요. 늘어나면 다시 '길어서 읽지 않는
                     목록'이 됩니다 (config 의 checklist 설명 참고). */}
              <div className="px-5 pt-5 sm:px-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink-soft">
                  {registration.checklistTitle}
                </h3>

                {/* ★ 가로 격자 — 열 수를 직접 정하지 않습니다 ★
                      repeat(auto-fit, minmax(150px, 1fr)) 이라, 자리가 나는
                      만큼 브라우저가 스스로 나눠 놓습니다.
                        컴퓨터(글칸 668px)  → 4열
                        태블릿(540px)       → 3열
                        휴대폰 375px(291px) → 1열
                          (2열이 되려면 150+8+150=308px 이 필요합니다)
                      ⚠️ sm:grid-cols-4 처럼 열 수를 못박지 마세요. 글자를
                         키워 보는 분(브라우저 확대)의 화면에서 카드가
                         찌그러집니다.
                      ⚠️ minmax 의 150px 을 키우면 태블릿에서 2열로 떨어집니다. */}
                <ul className="mt-3 grid gap-2 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
                  {registration.checklist.map((item) => (
                    <li
                      key={item.title}
                      className="rounded-lg border border-brand-100 bg-paper-soft px-3.5 py-3"
                    >
                      <p className="text-base font-bold text-brand-900">
                        {item.title}
                      </p>
                      {/* ⚠️ 여기에 학년 숫자를 적지 마세요. 실제 학년 표기는
                             접힌 곳의 '참가 대상'(eligibility) 한 곳에만
                             있습니다. */}
                      <p className="mt-1 text-sm text-ink">{item.body}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* --------------------------------------------- ② 미리 준비할 것
                  ★ 이 내용은 그동안 구글폼 안에만 있었습니다 (2026-08-19) ★
                    폼을 시작한 뒤에야 '영문 성명'이나 '보호자 전화번호'가
                    필요한 것을 알고, 자료를 찾으러 나가면서 작성을 중단하는
                    일이 있었습니다. 폼을 열기 전에 알려 주기 위한 상자입니다.
                  ⚠️ 항목은 **구글폼의 '신청 전 준비 사항'과 같아야 합니다.**
                     자동으로 맞춰지지 않습니다 (config 의 prepareItems 설명). */}
              <div className="px-5 pt-4 sm:px-6">
                <div className="rounded-lg bg-brand-50 px-4 py-3.5">
                  <p className="text-base font-bold text-brand-900">
                    {registration.prepareTitle}
                    {/* 제목과 '왜 필요한가'를 한 줄로 읽히게 붙입니다.
                        좁은 화면에서는 줄이 접히지만 뜻은 그대로입니다. */}
                    <span className="font-normal text-ink">
                      {" — "}
                      {registration.prepareNote}
                    </span>
                  </p>
                  <p className="mt-1.5 text-base text-ink">
                    {registration.prepareItems}
                  </p>
                </div>
              </div>

              {/* ------------------------------------------- ③ 나머지는 접어 둠
                  ★★★ 안쪽 글은 한 줄도 지우지 않았습니다 ★★★
                    참가 대상 · 참가비 · 참가 규정 7개 · 개인정보 처리 동의 ·
                    촬영 초상권 동의 · 마무리 문구가 **예전 그대로** 들어
                    있습니다. 자리만 접힌 곳으로 옮겼습니다.

                  ⚠️ 이 안의 글을 지우거나 요약하지 마세요. 개인정보 국외이전
                     안내는 법적으로 필요하고, **신청 폼보다 먼저** 있어야
                     합니다 (CLAUDE.md 의 개인정보 절). 접혀 있어도 폼보다
                     위에 있고 한 번만 누르면 펼쳐집니다.
                     ★ 접기를 없애고 예전 모양으로 돌리려면 이 <details> 와
                       <summary> 만 <div> 로 바꾸면 됩니다 (안쪽은 그대로).

                  ★ 자바스크립트가 없습니다 ★
                    브라우저 기본 기능인 <details> 를 씁니다. 학교 컴퓨터에서
                    스크립트가 막혀 있어도 열리고, 키보드(Tab → Enter)로도
                    열립니다 — 같은 이유를 src/app/faq/page.tsx 맨 위에도
                    적어 두었습니다. */}
              <details className="group mt-5 border-t border-brand-100">
                <summary
                  /* list-none 과 ::-webkit-details-marker 를 함께 끕니다.
                     앞의 것만으로는 옛 사파리에서 삼각형이 남습니다.
                     ⚠️ <summary> 를 <div onClick> 으로 바꾸지 마세요. 그러면
                        키보드로 열 수 없게 됩니다 (지금은 브라우저가 알아서
                        Tab·Enter 를 처리해 줍니다).
                     min-h-[56px]: 손가락으로 누르기 편한 크기 */
                  className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-bold text-brand-900 sm:px-6 sm:text-lg [&::-webkit-details-marker]:hidden"
                >
                  {registration.rulesSummaryLabel}
                  <ChevronDown className="h-5 w-5 shrink-0 text-brand-500 transition-transform duration-200 group-open:rotate-180" />
                </summary>

                <dl className="px-5 pb-1 sm:px-6">
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

                  {/* ⚠️ 아래 두 항목은 법적으로 필요한 안내입니다. 지우지 마세요.

                         ★ 이 두 항목만 아래쪽/위쪽 여백이 절반입니다 ★
                           다른 항목은 py-5 (위아래 20px)인데, '개인정보 처리
                           동의'의 아래와 '촬영·초상권 동의'의 위만 10px 입니다.
                           둘 사이 간격이 40px → 20px 이 됩니다 (2026-08-11
                           담당자 요청). 사이의 줄도 없어서, 두 동의가 한
                           덩어리로 붙어 보이게 하려는 것입니다.
                           ⚠️ py-5 로 되돌리면 다시 벌어집니다. */}
                  <div className="border-t border-brand-100 pb-2.5 pt-5">
                    <dt className="text-sm font-bold uppercase tracking-wider text-ink-soft">
                      {registration.privacyNoticeTitle}
                    </dt>
                    <dd className="mt-2 text-base text-ink">
                      {registration.privacyNotice}
                    </dd>
                  </div>

                  {/* ⚠️ 이 항목에는 border-t 가 없습니다 (2026-08-11 담당자 요청).
                         바로 위 '개인정보 처리 동의'와 이 '촬영 초상권 동의'는
                         한 묶음으로 읽혀야 해서 사이의 줄을 뺐습니다.
                         ⚠️ 다른 항목처럼 border-t 를 붙이지 마세요. */}
                  <div className="pb-5 pt-2.5">
                    <dt className="text-sm font-bold uppercase tracking-wider text-ink-soft">
                      {registration.portraitRightsNoticeTitle}
                    </dt>
                    <dd className="mt-2 text-base text-ink">
                      {registration.portraitRightsNotice}
                    </dd>
                  </div>
                </dl>

                {/* ⚠️ 이 줄은 border-t 가 없습니다 (2026-08-11 담당자 요청).
                     각주처럼 떨어져 보이지 않게, 위 두 동의 항목과 한 덩어리로
                     읽히도록 한 것입니다.

                     글씨는 바로 위 설명글과 완전히 같습니다 —
                     크기 text-base · 색 text-ink · 굵기 보통(400).
                     ⚠️ 다시 작게(text-sm) 하거나 흐리게(text-ink-soft)
                        만들지 마세요. 담당자가 위 글과 같은 무게로 두기로
                        했습니다. */}
                <p className="px-5 pb-5 text-base text-ink sm:px-6">
                  {registration.consentNoticeFooter}
                </p>
              </details>

              {/* ------------------------------------------------ ④ 신청 단추
                  ★ 상자 **안쪽** 맨 아래입니다 (2026-08-19 담당자 지시) ★
                    위를 확인한 뒤 누르는 단추이므로 상자 밖으로 내지
                    않습니다. 머리띠에도 같은 단추를 만들지 마세요 —
                    확인 사항을 건너뛰는 지름길이 됩니다.

                  ★ 자바스크립트가 없습니다 ★
                    그냥 같은 페이지 안의 자리(#apply-form)를 가리키는
                    링크입니다. 부드럽게 내려가는 것은 globals.css 의
                    `html { scroll-behavior: smooth }` 가 해 주고, 움직임을
                    불편해하는 분(prefers-reduced-motion)에게는 같은 파일이
                    `scroll-behavior: auto` 로 되돌려 **즉시** 이동합니다.
                    ⚠️ 여기에 onClick 스크롤 코드를 넣지 마세요. 이 화면은
                       자바스크립트 없이도 동작합니다 — 학교 컴퓨터에서
                       가장 안전한 방식입니다.
                  ⚠️ 가리키는 자리를 바꾸려면 아래 신청 폼 구역의
                     id="apply-form" 도 같이 고치세요. */}
              <div className="border-t border-brand-100 px-5 py-5 sm:px-6">
                <a
                  href="#apply-form"
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-accent-600 px-7 text-base font-bold text-white shadow-lg shadow-accent-600/20 transition-colors hover:bg-accent-700 sm:w-auto sm:text-lg"
                >
                  {registration.applyCtaLabel}
                  <ChevronDown className="h-5 w-5 shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- 신청 폼
            ★ id="apply-form" — 위 상자 맨 아래 단추가 가리키는 자리입니다 ★
              ⚠️ 이 id 를 바꾸거나 지우면 그 단추가 아무 데도 가지 않습니다.
                 (링크는 같은 파일 위쪽, `href="#apply-form"`)

            ★ scroll-mt-[var(--nav-h)] 를 지우지 마세요 ★
              상단 메뉴는 화면에 붙어 있어서(sticky), 이 자리로 내려오면
              브라우저가 구역 윗변을 **화면 맨 위**에 맞춥니다. 그러면 첫
              줄이 메뉴 뒤로 숨습니다. 메뉴 높이(52/64/80px)만큼 덜 내려오게
              하는 값이고, 숫자가 아니라 globals.css 의 --nav-h 를 그대로
              씁니다 — 메뉴 높이가 바뀌면 저절로 따라옵니다.
              (globals.css 의 `#main` 에 같은 처리가 되어 있습니다) */}
        <section
          id="apply-form"
          className="scroll-mt-[var(--nav-h)] bg-paper-soft py-12 sm:py-16"
        >
          <div className={container}>
            <ApplyForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
