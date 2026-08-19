import { Fragment, type ReactNode } from "react";

/* ============================================================================
 *  config 의 글에서 일부만 굵게 보여 주기
 *
 *  ★ 왜 필요한가 ★
 *    이 사이트의 모든 문구는 `config/competition.ts` 에 있습니다(CLAUDE.md 의
 *    가장 중요한 규칙). 그런데 리액트는 글자를 그대로만 그리기 때문에, config
 *    문장 안의 한 부분만 굵게 하려면 방법이 필요했습니다.
 *    화면 파일에 그 문장을 직접 적어 굵게 만들 수도 있지만, 그러면 문구가
 *    코드 안으로 들어가 버려 비개발자가 고칠 수 없게 됩니다.
 *
 *  ★ 쓰는 법 — config 에서 굵게 할 부분을 `**` 두 개로 감쌉니다 ★
 *
 *      body: '상위 팀에게 **2027년 5월 서울에서 열리는 세계대회**에 …'
 *                          ↑                              ↑
 *                        여기부터                        여기까지 굵게
 *
 *    (마크다운과 같은 표시라 처음 보는 사람도 짐작할 수 있습니다)
 *
 *  ⚠️ `**` 를 짝이 맞게 넣으세요. 홀수 개면 **아무것도 굵어지지 않고**
 *     화면에 `**` 가 그대로 보입니다. 일부러 그렇게 했습니다 — 글이 엉뚱한
 *     데까지 굵어지는 것보다, 표시가 눈에 보여 바로 알아채는 것이 낫습니다.
 *
 *  ⚠️ 굵게 하는 것 말고는 아무것도 하지 않습니다. 마크다운 흉내를 더 내지
 *     마세요(기울임·링크·목록 등). 필요해지면 그때 진짜 마크다운을 쓸지
 *     따로 판단해야 합니다. 지금 이 파일이 작은 것이 장점입니다.
 *
 *  【 지금 별표를 쓸 수 있는 config 항목 — 2026-08-19 확인 】
 *    · `about.journey[].body`      — 홈(HomeIntro.tsx) **과** /about
 *    · `aboutPage.intro[]`         — /about
 *    · `aboutPage.worldSupport.body` — /about
 *    · `categoryDetails.*.whatItIs[]`        — 종목 상세
 *    · `categoryDetails.*.prepare.robotKit`  — 종목 상세
 *    · `categoryDetails.*.prepare.computer`  — 종목 상세
 *    · `categoryDetails.*` 의 목록들(`howItRuns`·`prepare.beforeEvent`·
 *      `prepare.onSite`·`notes`) — 종목 상세의 Bullets 를 거칩니다
 *    · `scheduleNotice`            — /schedule (2026-08-19 추가)
 *
 *  ⚠️⚠️ **`about.journey` 는 두 화면이 같은 글을 씁니다.** 한 화면에만
 *     withBold 를 넣으면 다른 화면에 `**` 가 그대로 보입니다. 나머지 항목은
 *     쓰는 화면이 하나뿐이라 그 걱정이 없습니다 — 하지만 **어떤 항목이든
 *     새 화면에서 쓰기 시작하면 그 화면에도 withBold 를 넣어야 합니다**
 *     (CLAUDE.md 의 규칙).
 *
 *  ℹ️ 이 목록은 손으로 적은 것이라 낡을 수 있습니다. 지금 상태는 이렇게
 *     확인합니다 — `grep -rn "withBold(" src/`
 * ========================================================================== */

/** `**…**` 로 감싼 부분만 굵게 만들어 돌려줍니다.
 *
 *  @param text config 에서 가져온 문장
 *  @returns 굵은 부분이 `<strong>` 으로 바뀐 조각들 (표시가 없으면 원문 그대로)
 */
export function withBold(text: string): ReactNode {
  const parts = text.split("**");

  /* 표시가 아예 없거나(1조각), 짝이 맞지 않으면(짝수 조각) 원문을 그대로
     돌려줍니다. 위 주석의 '홀수 개면 그대로 보인다'가 이 줄입니다. */
  if (parts.length === 1 || parts.length % 2 === 0) return text;

  /* 조각은 '바깥, 안, 바깥, 안, …' 순서로 나옵니다.
     홀수 번째(1, 3, 5…)가 `**` 안에 있던 글이라 굵게 만듭니다. */
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      /* 색은 일부러 지정하지 않습니다 — 둘레 글자 색을 그대로 물려받아야
         본문 안에서 '굵기만 다른 같은 글'로 보입니다. */
      <strong key={index} className="font-bold">
        {part}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
