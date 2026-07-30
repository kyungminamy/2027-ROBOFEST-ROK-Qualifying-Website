/**
 * ============================================================================
 *  2027 ROBOFEST World Championship 국내예선대회 — 대회 정보 설정 파일
 * ============================================================================
 *
 *  ★ 이 파일이 웹사이트의 유일한 정보 출처입니다. ★
 *
 *  날짜, 장소, 종목, 연락처를 바꾸려면 이 파일만 수정하세요.
 *  웹사이트의 모든 페이지가 이 파일을 읽어서 표시합니다.
 *
 *  【 수정 방법 (개발 지식 불필요) 】
 *   1. github.com 에서 이 파일을 엽니다
 *   2. 연필 아이콘(Edit)을 누릅니다
 *   3. 따옴표 '' 안의 내용만 바꿉니다
 *   4. 아래 'Commit changes' 버튼을 누릅니다
 *   5. 약 1분 뒤 웹사이트에 자동 반영됩니다
 *
 *  【 주의 】
 *   · 따옴표 ' ' 와 쉼표 , 는 절대 지우지 마세요
 *   · 실수로 문법이 깨지면 웹사이트가 배포되지 않고
 *     기존 화면이 그대로 유지됩니다 (안전장치입니다)
 *   · 날짜는 반드시 'YYYY-MM-DD' 형식으로 입력하세요
 *
 *  최종 수정: 2026-07-30
 * ============================================================================
 */

export const competition = {
  // ==========================================================================
  //  1. 대회 기본 정보
  // ==========================================================================

  /** 대회 정식 명칭. '(가칭)'은 명칭 확정 후 삭제하세요. */
  name: '(가칭) 2027 ROBOFEST World Championship 국내예선대회',

  /** 짧은 이름 — 메뉴, 브라우저 탭 제목 등에 사용 */
  shortName: '2027 ROBOFEST 국내예선대회',

  /** 주최·주관 기관 */
  host: '부산광역시교육청',

  /** 운영 및 공인 기관 */
  operators: ['(주)럭스로보', 'ROBOFEST 본부 (Lawrence Technological University)'],

  /** 공식 예선 여부. 2026-07-29 확정됨. */
  isOfficialQualifier: true,

  // ==========================================================================
  //  2. 대회 일정
  //  ⚠️ 2026-11-27(금)~28(토)로 확정됨 (2026-07-29)
  //     계획서 일부와 마일스톤 엑셀에 11/28~29로 적힌 곳이 있으나 폐기된 안입니다.
  // ==========================================================================

  dates: {
    /** 시설 설치일 (D-1) — 참가자 대상 아님, 운영진만 */
    setup: '2026-11-26',

    /** 대회 1일차 — 개회식, Game·BottleSumo 예선, UMC */
    day1: '2026-11-27',

    /** 대회 2일차 — 결승, RoboParade·RoboArts, 시상식 */
    day2: '2026-11-28',
  },

  // ==========================================================================
  //  3. 참가 접수
  // ==========================================================================

  registration: {
    /**
     * 접수 시작일
     *
     * ⚠️ 이 날짜는 '안내 문구'일 뿐입니다. 접수를 막지 않습니다.
     *    신청 폼은 이 날짜와 관계없이 항상 사이트에 표시됩니다.
     *
     * ★★★ 접수를 실제로 열고 닫는 것은 구글폼의 '응답 받기' 설정입니다 ★★★
     *      아래 closesAt 설명을 꼭 읽어 주세요.
     */
    opensAt: '2026-09-01',

    /**
     * 접수 마감일
     *
     * ⚠️ 미확정 항목입니다 (2026-07-29 기준)
     *    계획서 = 10월 16일 / 마일스톤 엑셀 = 10월 30일
     *    현재 계획서 기준인 10/16으로 설정되어 있습니다.
     *
     *    10/30으로 늘리면 홍보 기간이 2주 늘어납니다.
     *    다만 대진 편성(11/6)까지 시간이 촉박해집니다.
     *    담당자가 결정한 뒤 이 날짜만 바꾸면 안내 문구가 바뀝니다.
     *
     * ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
     *  마감일에 반드시 해야 할 일 — 이 날짜만 바꿔서는 접수가 닫히지 않습니다
     * ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
     *
     *  【 접수를 닫는 방법 】
     *   구글폼 → '응답' 탭 → '응답 받기' 를 끕니다. (스위치 끄기)
     *   그러면 사이트의 신청 폼 자리에 구글이
     *   '더 이상 응답을 받지 않습니다' 를 자동으로 보여줍니다.
     *
     *  【 왜 이렇게 하나 】
     *   구글폼 주소를 아는 사람은 우리 사이트를 거치지 않고도 제출할 수
     *   있습니다. 그래서 사이트에서 폼을 숨기는 것만으로는 접수가 닫히지
     *   않습니다. 접수를 여닫는 곳은 구글폼 한 곳뿐입니다.
     *
     *  담당자 한 명에게 '마감일에 응답 받기 끄기'를 반드시 맡겨 두세요.
     */
    closesAt: '2026-10-16',

    /** 참가비 (원). 0 = 무료. 부산광역시교육청 예산으로 운영. */
    feeKrw: 0,

    /**
     * ★★★ 구글폼 주소 — 참가 신청 페이지(/apply)에 표시됩니다 ★★★
     *
     *  【 주소 얻는 방법 】
     *   1. 구글폼 편집 화면 오른쪽 위 '보내기(Send)' 클릭
     *   2. 링크 아이콘(🔗) 탭 선택
     *   3. ⚠️ 'URL 단축(Shorten URL)' 체크를 반드시 끄세요
     *   4. 나온 주소를 복사해 아래 따옴표 안에 붙여넣으세요
     *
     *   올바른 형태:
     *     'https://docs.google.com/forms/d/e/1FAIpQL.../viewform'
     *
     *   ⚠️ 'https://forms.gle/...' 짧은 주소는 쓰지 마세요.
     *      페이지 안에 폼이 깔끔하게 들어가지 않습니다.
     *
     *   여기가 빈칸이면 신청 페이지가 '접수 링크 준비 중'을 표시합니다.
     *   눌러도 아무 일 안 나는 버튼을 막기 위한 안전장치입니다.
     *
     *   ℹ️ '?embedded=true' 는 붙이지 않아도 됩니다.
     *      사이트가 필요할 때 자동으로 붙입니다.
     *      (붙여서 넣어도 문제없이 동작합니다)
     */
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSeAyuLNh-GRtF1uOcxN1qavYx1yA66SyMTqEG5AiIQzsq1sDw/viewform',

    /**
     * ★★★ 비상 전환 스위치 — 이 프로젝트에서 가장 중요한 안전장치 ★★★
     *
     *   'embed' = 우리 사이트 안에 구글폼을 넣어서 보여줍니다 (평상시)
     *   'link'  = 폼을 넣지 않고 '구글폼에서 신청하기' 버튼만 보여줍니다
     *
     *   【 언제 'link' 로 바꾸나 】
     *    · 학교 인터넷에서 폼이 안 보인다는 문의가 들어올 때
     *    · 휴대폰에서 폼이 이상하게 나올 때
     *    · 폼 안쪽이 잘려 보이는데 고칠 사람이 없을 때
     *
     *    이 한 단어만 'link'로 바꾸고 저장하면 약 1분 뒤 반영됩니다.
     *    접수는 그대로 계속 받을 수 있습니다.
     *
     *   접수 시작(9/1) 전에 한 번 시험해 보고 'embed'로 되돌리세요.
     */
    applyMode: 'embed' as 'embed' | 'link',

    /**
     * 폼이 들어갈 칸의 높이 (픽셀)
     *
     *  ⚠️ 이 숫자는 자동으로 맞춰지지 않습니다. 구글 정책상 불가능합니다.
     *     그래서 폼에 질문을 넣거나 뺄 때마다 이 숫자를 손봐야 합니다.
     *
     *  ★ 이 폼은 '한 페이지'입니다 (섹션 나누기 없음). ★
     *    그래서 높이가 하나로 정해지고, 여백 없이 거의 딱 맞습니다.
     *    ⚠️ 구글폼에 다시 '섹션(페이지) 나누기'를 넣지 마세요.
     *       페이지마다 길이가 달라져서 어느 숫자를 넣어도 맞지 않게 됩니다.
     *
     *  2026-07-30 실측값 (41문항, 동의 항목 2개 포함):
     *    휴대폰 320px → 11,235px  ← 가장 김
     *    휴대폰 375px → 10,355px
     *    휴대폰 390px → 10,171px  (아이폰 14/15)
     *    태블릿 640px →  9,025px
     *    데스크톱     →  8,893px  ← 가장 짧음
     *
     *  현재 값 11400 은 '가장 긴 경우(11,235)'에 맞춘 값입니다.
     *  → 어떤 휴대폰에서도 폼 안쪽 스크롤바가 생기지 않습니다.
     *
     *  ⚠️ 동의 항목의 '설명' 글이 길면 높이가 크게 늘어납니다.
     *     동의 항목 2개를 넣었을 때 2,579px 늘어났습니다.
     *     남은 동의 항목(국외이전, 법정대리인)을 추가하면 또 늘어나므로
     *     추가 후 반드시 다시 재세요.
     *
     *  【 ★ 질문을 추가·삭제했으면 이 숫자를 꼭 확인하세요 ★ 】
     *   질문 1개당 대략 150~400px 늘거나 줄어듭니다.
     *   실제로 2026-07-30 에 질문 2개(팀 이름, BottleSumo 희망 시)를
     *   추가했을 때 736px 늘어나서, 그 전 값(7300)으로는 휴대폰에서
     *   스크롤바가 생기는 상태가 되었습니다. 선택지가 긴 문항은
     *   특히 많이 늘어납니다.
     *
     *   휴대폰으로 /apply 를 열어 보고 아래처럼 조절하세요.
     *    · 폼 안쪽에 위아래 스크롤바가 생겼다 → 숫자를 키우세요
     *    · 제출 버튼 아래 여백이 너무 많다   → 숫자를 줄이세요
     *
     *  ★ 애매하면 큰 쪽으로 두세요. ★
     *    여백이 남는 것보다 스크롤바 두 개가 훨씬 불편합니다.
     */
    embedHeightPx: 11400,

    /**
     * ★★★ 신청 폼 위에 항상 표시되는 법적 안내 문구 ★★★
     *
     *  ⚠️ 법적으로 필요한 안내입니다. 지우지 마세요.
     *     신청자가 입력을 '시작하기 전에' 알려야 하는 내용입니다.
     *
     *  ⚠️ 여기 있는 것은 '요약'입니다.
     *     실제 동의(체크박스)는 구글폼 마지막에 있습니다.
     *     동의 기록은 응답 데이터와 같은 곳에 남아야 하기 때문입니다.
     *     둘 중 하나만 바꾸면 내용이 어긋납니다. 항상 같이 고치세요.
     *
     *  담당자가 문구를 다듬을 수 있도록 여기에 두었습니다.
     *  법적 표현은 반드시 담당자 검토를 받으세요.
     */

    /** 1) 개인정보 — 구글폼이 해외 서버를 쓰는 점을 반드시 포함해야 합니다 */
    privacyNotice:
      '참가 신청은 구글폼(Google Forms)으로 접수됩니다. 입력하신 개인정보는 구글의 해외 서버(미국 등)에 저장되며, 참가 자격 확인·대회 운영·참가자 연락·시상 목적으로만 사용됩니다. 만 14세 미만 학생은 법정대리인(보호자)의 동의가 필요합니다.',

    /** 2) 촬영·초상권 — 대회가 사진·영상으로 촬영되고 생중계될 수 있으므로 필요합니다 */
    portraitRightsNotice:
      '대회 현장은 사진과 영상으로 촬영되며, 경기 장면은 온라인으로 생중계될 수 있습니다. 촬영물은 대회 기록과 대회 홍보(누리집·SNS·보도자료 등) 목적으로 사용됩니다.',

    /** 3) 두 안내 아래에 공통으로 붙는 마무리 문구 */
    consentNoticeFooter:
      '위 두 가지에 대한 동의 항목은 신청 폼 마지막에 있습니다. 전문을 확인하신 뒤 동의해 주세요.',

    /** 목표 참가 규모 — 안내문에 표시 */
    targetTeams: 100,
    estimatedStudents: 400,
    estimatedTotalAttendees: 600,
  },

  // ==========================================================================
  //  4. 대회 장소
  //  ⚠️ 2026-07-29 기준 '예정' 상태입니다. 계약 확정 후 isConfirmed를 true로 바꾸세요.
  //     false인 동안에는 사이트에 '(예정)'이 자동으로 붙습니다.
  // ==========================================================================

  venue: {
    name: '부산보건대학교 체육관',
    isConfirmed: false,
    address: '', // 계약 확정 후 도로명 주소 입력
    /** 네이버/카카오 지도 링크 — 확정 후 입력 */
    mapUrl: '',
    parkingNote: '주차 안내는 장소 확정 후 공지 예정입니다.',
  },

  // ==========================================================================
  //  5. 주요 일정 (일정 안내 페이지에 순서대로 표시됩니다)
  //     새 일정을 추가하려면 { } 블록을 복사해 붙여넣고 내용을 바꾸세요.
  // ==========================================================================

  milestones: [
    {
      date: '2026-08-24',
      title: '모집 공고 및 홍보 개시',
      description: '전국 시도교육청 공문 발송',
    },
    {
      date: '2026-09-01',
      title: '참가 접수 시작',
      description: '온라인 접수. 종목별 정원제로 조기 마감될 수 있습니다.',
    },
    {
      // ⚠️ 이 날짜는 ROBOFEST 본부(LTU)가 정합니다. 2026년 9월 말~10월 초 예상.
      //    본부 발표 후 정확한 날짜로 수정하세요.
      date: '2026-10-02',
      title: '2027 Game 미션 공개',
      description: 'ROBOFEST 본부에서 당해 연도 Game 미션을 공개합니다.',
      isEstimated: true,
    },
    {
      date: '2026-10-08',
      title: '참가팀 온라인 설명회',
      description: '종목별 규정 안내 및 질의응답. 접수 기간 중 개최됩니다.',
    },
    {
      date: '2026-10-16',
      title: '참가 접수 마감',
      description: '정원 도달 시 조기 마감될 수 있습니다.',
    },
    {
      date: '2026-11-06',
      title: '참가팀 확정 및 대진표 공지',
      description: '',
    },
    {
      date: '2026-11-27',
      title: '대회 1일차',
      description: '개회식, Game·BottleSumo 예선, UMC, Exhibition·RoboMed 심사',
    },
    {
      date: '2026-11-28',
      title: '대회 2일차',
      description: '준결승·결승, RoboParade, RoboArts 공연, 시상식·폐회식',
    },
  ],

  // ==========================================================================
  //  6. 운영 종목 (8종목)
  //
  //  【 용어 주의 】
  //   영문 'Qualifier'는 ROBOFEST 본부 기준으로 Game·Exhibition에만 쓰는 말입니다.
  //   나머지 종목에 영문 Qualifier를 쓰면 규정 오류로 읽힙니다.
  //   한글 '국내선발' 또는 '대표 선발'을 사용하세요.
  //
  //  【 정원 (capacity) 】
  //   종목별 정원입니다. 총합이 targetTeams(100)에 맞도록 조정하세요.
  //   현재 값은 임시 배분이며 담당자 확정이 필요합니다.
  // ==========================================================================

  categories: [
    {
      slug: 'game',
      name: 'Game',
      nameKo: '게임',
      summary: '매년 공개되는 미션을 자율주행 로봇으로 수행하는 ROBOFEST 대표 종목',
      divisions: ['Junior', 'Senior'],
      maxTeamSize: 5,
      kitRestriction: '제한 없음 (Any Kit, Any Language)',
      /** 세계대회 직접 선발 종목인지 (ROBOFEST 본부 공식 Qualifier) */
      isWorldQualifier: true,
      difficulty: '중급~고급',
      capacity: 24,
      rulesUrl: 'https://www.robofest.net/index.php/current-competitions/game',
    },
    {
      slug: 'exhibition',
      name: 'Exhibition',
      nameKo: '전시',
      summary: '자유 주제의 창의 자율로봇 프로젝트를 전시하고 발표하는 종목',
      divisions: ['Junior', 'Senior'],
      maxTeamSize: 5,
      kitRestriction: '제한 없음',
      isWorldQualifier: true,
      difficulty: '중급~고급',
      capacity: 16,
      rulesUrl: 'https://www.robofest.net/index.php/current-competitions/exhibition',
    },
    {
      slug: 'umc',
      name: 'UMC',
      nameKo: '미지의 미션 챌린지',
      summary: '당일 공개되는 미션을 제한 시간 내에 해결하는 즉석 문제해결 종목',
      divisions: ['Junior', 'Senior'],
      maxTeamSize: 4,
      kitRestriction: 'LEGO NXT·EV3·SPIKE Prime/Robot Inventor 또는 VEX IQ만 가능',
      isWorldQualifier: false,
      difficulty: '중급~고급',
      capacity: 12,
      rulesUrl: 'https://www.robofest.net/index.php/current-competitions/unknown-mission-challenge',
    },
    {
      slug: 'bottlesumo',
      name: 'BottleSumo',
      nameKo: '보틀스모',
      summary: '병을 밀어내고 상대 로봇과 겨루는 서바이벌 방식의 입문자 친화 종목',
      // ⚠️ 2026 시즌부터 Junior Unlimited가 신설되어 4개 부문입니다
      divisions: ['Junior Classic', 'Junior Unlimited', 'Senior Classic', 'Senior Unlimited'],
      maxTeamSize: 3,
      kitRestriction: 'Classic 부문은 LEGO·VEX IQ만 / Unlimited 부문은 제한 없음',
      isWorldQualifier: false,
      difficulty: '입문',
      capacity: 20,
      rulesUrl: 'https://www.robofest.net/index.php/current-competitions/bottlesumo',
    },
    {
      slug: 'vcc',
      name: 'VCC',
      nameKo: '비전 중심 챌린지',
      summary: '카메라 영상인식(머신비전) 기반의 고급 로봇 종목',
      divisions: ['Senior'],
      maxTeamSize: 5,
      kitRestriction: '제한 없음 (USB 카메라 1대만 사용 가능)',
      isWorldQualifier: false,
      difficulty: '고급',
      capacity: 6,
      rulesUrl: 'https://www.robofest.net/index.php/current-competitions/vision-centric-challenge',
    },
    {
      slug: 'roboparade',
      name: 'RoboParade',
      nameKo: '로보퍼레이드',
      summary: '장식한 자율주행 로봇이 정해진 경로를 행진하는 창의·예술 종목',
      // ⚠️ 초4까지 참가 가능한 유일한 종목입니다 (Expanded Junior)
      divisions: ['Expanded Junior (초4~중2)'],
      maxTeamSize: 5,
      kitRestriction: '제한 없음',
      isWorldQualifier: false,
      difficulty: '입문',
      capacity: 10,
      rulesUrl: 'https://www.robofest.net/index.php/current-competitions/roboparade',
    },
    {
      slug: 'roboarts',
      name: 'RoboArts',
      nameKo: '로보아츠',
      summary: '음악·미술·퍼포먼스 등 예술과 로봇을 결합한 종목',
      divisions: ['Junior', 'Senior'],
      maxTeamSize: 5,
      kitRestriction: '제한 없음',
      isWorldQualifier: false,
      difficulty: '중급',
      capacity: 6,
      rulesUrl: 'https://www.robofest.net/index.php/current-competitions/roboarts',
    },
    {
      slug: 'robomed',
      name: 'RoboMed',
      nameKo: '로보메드',
      summary: '의료·바이오메디컬 분야의 로봇 및 기기 프로젝트 종목',
      divisions: ['Junior', 'Senior'],
      maxTeamSize: 5,
      kitRestriction: '제한 없음',
      isWorldQualifier: false,
      difficulty: '중급~고급',
      capacity: 6,
      rulesUrl: 'https://www.robofest.net/index.php/current-competitions/robomed',
    },
  ],

  // ==========================================================================
  //  7. 참가 자격
  // ==========================================================================

  eligibility: {
    /** 학년 구분 — 미국 기준 학년을 한국 학제로 환산한 값 */
    junior: '초등학교 5학년 ~ 중학교 2학년',
    senior: '중학교 3학년 ~ 고등학교 2학년',
    expandedJunior: '초등학교 4학년 ~ 중학교 2학년 (RoboParade 전용)',

    /** 참가 규정 요약 — 안내 페이지에 목록으로 표시됩니다 */
    rules: [
      '팀 구성은 학생 1~5명과 성인 지도자 1명입니다. (종목별 최대 인원은 다를 수 있습니다)',
      '한 명의 지도자가 여러 팀을 지도할 수 있습니다.',
      '경기 중 사람이 로봇을 조종할 수 없습니다. 100% 자율주행이 원칙입니다.',
      '로봇의 설계·조립·프로그래밍은 학생이 직접 수행해야 합니다.',
      '지도자는 대회 당일 작업 구역에 출입할 수 없습니다.',
      '한 학생이 여러 종목에 참가할 수 있으나, 같은 종목에서는 한 팀에만 소속됩니다.',
    ],
  },

  // ==========================================================================
  //  8. 2027 세계대회 안내
  //  ⚠️ 세계대회는 '서울 광운대학교'입니다. 부산은 국내예선 장소입니다. 혼동 주의.
  // ==========================================================================

  worldChampionship: {
    year: 2027,
    edition: 28,
    location: '광운대학교, 서울',
    period: '2027년 5월',
    note: 'ROBOFEST 사상 최초로 미국 외 지역에서 개최되는 세계대회입니다.',
    announcementUrl:
      'https://ltu.edu/world-robofest-2027-to-be-hosted-at-kwangwoon-university-in-seoul-south-korea/',

    /**
     * ⚠️ 국가별 진출 팀 수(쿼터)가 아직 확정되지 않았습니다 (2026-07-29 기준).
     *    확정 전까지 '몇 팀이 진출한다'는 표현을 쓰지 마세요.
     *    아래 문구처럼 '기회 제공' 수준으로만 안내합니다.
     */
    advancementNotice:
      '종목별 상위 팀에게 2027 세계대회 진출 기회가 제공됩니다. 진출 팀 수는 ROBOFEST 본부의 국가별 배정 기준에 따라 결정되며, 확정되는 대로 공지합니다.',
  },

  // ==========================================================================
  //  9. 문의처
  //  ⚠️ 담당자 변경 시 반드시 수정하세요. 개인 이메일이 아닌 공용 주소를 사용하세요.
  // ==========================================================================

  contact: {
    organization: '(주)럭스로보 교육사업부',
    email: '', // 공용 이메일 주소 입력 (개인 계정 사용 금지)
    phone: '',
    /** 운영 시간 안내 문구 */
    hours: '평일 09:00 ~ 18:00',
  },

  // ==========================================================================
  //  10. 공식 링크
  // ==========================================================================

  links: {
    robofestOfficial: 'https://www.robofest.net/',
    robofestGetStarted: 'https://www.robofest.net/index.php/current-competitions/overview',
    generalRulesPdf: 'https://www.robofest.net/images/2526/General2026_V1.pdf',
    busanEducationOffice: 'https://www.pen.go.kr/',
    luxrobo: 'https://korea.luxrobo.com/',
    /** 유튜브 생중계 주소 — 대회 직전에 입력 */
    liveStream: '',
  },

  // ==========================================================================
  //  11. 웹사이트 메타 정보
  //      네이버·구글 검색 결과와 카카오톡으로 링크를 공유할 때 보이는 문구입니다.
  // ==========================================================================

  seo: {
    /** 검색 결과에서 제목 아래에 나오는 설명문 (한글 80~100자 권장) */
    description:
      '부산광역시교육청이 주최하는 2027 ROBOFEST World Championship 국내예선대회 안내입니다. 전국 초·중·고 학생 대상, 참가비 무료, 100% 자율주행 로봇 대회입니다.',

    /** 사이트 최종 주소 — 도메인이 확정되면 입력하세요 (검색 노출에 사용) */
    siteUrl: '',
  },
} as const;

// ============================================================================
//  아래는 계산용 코드입니다. 수정하지 마세요.
// ============================================================================

export type Category = (typeof competition.categories)[number];

/** 현재 접수 기간인지 여부 */
export function isRegistrationOpen(now: Date = new Date()): boolean {
  const opens = new Date(`${competition.registration.opensAt}T00:00:00+09:00`);
  const closes = new Date(`${competition.registration.closesAt}T23:59:59+09:00`);
  return now >= opens && now <= closes;
}

/** 대회까지 남은 일수 (지난 경우 음수) */
export function daysUntilCompetition(now: Date = new Date()): number {
  const day1 = new Date(`${competition.dates.day1}T00:00:00+09:00`);
  return Math.ceil((day1.getTime() - now.getTime()) / 86_400_000);
}

/**
 * 'YYYY-MM-DD' → '2026년 11월 27일(금)'
 *
 * ⚠️ 절대 new Date('...').getDay() 방식으로 바꾸지 마세요.
 *    배포 서버(Vercel)는 UTC로 동작하기 때문에 한국 날짜가 하루 밀려서
 *    11월 27일(금)이 11월 26일(목)으로 표시됩니다.
 *    아래처럼 문자열을 직접 분해해야 서버 시간대와 무관하게 정확합니다.
 */
export function formatKoreanDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][
    new Date(Date.UTC(y, m - 1, d)).getUTCDay()
  ];
  return `${y}년 ${m}월 ${d}일(${weekday})`;
}

/**
 * 구글폼 주소가 입력되어 있는지 여부.
 * 비어 있으면 신청 페이지가 '준비 중'을 표시합니다.
 */
export function hasApplyForm(): boolean {
  const raw: string = competition.registration.formUrl;
  return raw.trim().length > 0;
}

/**
 * 페이지 안에 폼을 넣을 때 쓰는 주소.
 *
 * 구글폼 주소 끝에 'embedded=true'를 붙여야 폼 바깥의 구글 머리말·꼬리말이
 * 사라져서 우리 페이지에 자연스럽게 들어갑니다. 담당자가 그것까지
 * 신경 쓰지 않도록 여기서 자동으로 붙입니다.
 *
 * 주소 형식이 잘못되어 있으면 null 을 돌려주고, 화면에는 폼 대신
 * '준비 중' 안내가 표시됩니다. (잘못된 주소로 빈 칸을 띄우지 않기 위함)
 */
export function applyFormEmbedUrl(): string | null {
  const raw: string = competition.registration.formUrl;
  if (!raw.trim()) return null;
  try {
    const url = new URL(raw.trim());
    url.searchParams.set('embedded', 'true');
    return url.toString();
  } catch {
    return null;
  }
}

/**
 * '새 창에서 열기' 링크에 쓰는 주소.
 *
 * 'embedded=true' 가 붙은 주소를 새 창에서 열면 구글폼의 머리말이 사라진
 * 반쪽짜리 화면이 나옵니다. 그래서 새 창용 주소에서는 그 값을 떼어냅니다.
 * (담당자가 실수로 embedded=true 가 붙은 주소를 넣어도 안전합니다)
 */
export function applyFormDirectUrl(): string | null {
  const raw: string = competition.registration.formUrl;
  if (!raw.trim()) return null;
  try {
    const url = new URL(raw.trim());
    url.searchParams.delete('embedded');
    return url.toString();
  } catch {
    return null;
  }
}

/** 장소명 — 미확정이면 '(예정)'을 자동으로 붙임 */
export function venueDisplayName(): string {
  return competition.venue.isConfirmed
    ? competition.venue.name
    : `${competition.venue.name} (예정)`;
}
