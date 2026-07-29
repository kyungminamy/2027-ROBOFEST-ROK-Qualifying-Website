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
 *  최종 수정: 2026-07-29
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
     * ★★★ 비상 전환 스위치 ★★★
     *
     *   'native'   = 우리 사이트의 신청 폼 사용 (평상시)
     *   'external' = 아래 formUrl의 외부 폼(구글폼)으로 안내 (비상시)
     *
     *   【 언제 바꾸나 】
     *    신청 폼에 문제가 생겼는데 고칠 사람이 없을 때,
     *    이 한 단어만 'external'로 바꾸고 저장하세요.
     *    약 1분 뒤부터 신청자는 백업 폼으로 안내됩니다.
     *
     *   개발 지식 없이 접수를 계속 받을 수 있는 안전장치입니다.
     */
    mode: 'native' as 'native' | 'external',

    /** 접수 시작일 — 이 날짜 전에는 신청 버튼이 '준비 중'으로 표시됩니다 */
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
     *    담당자가 결정한 뒤 이 날짜만 바꾸면 사이트 전체에 반영됩니다.
     */
    closesAt: '2026-10-16',

    /** 참가비 (원). 0 = 무료. 부산광역시교육청 예산으로 운영. */
    feeKrw: 0,

    /**
     * 백업 폼 주소 (구글폼 등).
     * 위 mode를 'external'로 바꿨을 때 신청자가 이동할 주소입니다.
     *
     * ⚠️ 평상시엔 쓰지 않지만 반드시 미리 만들어 두세요.
     *    비상시에 폼을 새로 만들 시간은 없습니다.
     */
    formUrl: '',

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

/** 장소명 — 미확정이면 '(예정)'을 자동으로 붙임 */
export function venueDisplayName(): string {
  return competition.venue.isConfirmed
    ? competition.venue.name
    : `${competition.venue.name} (예정)`;
}
