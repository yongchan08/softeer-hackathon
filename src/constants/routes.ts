/**
 * 라우트 경로 단일 출처.
 * 경로 문자열을 컴포넌트에 흩뿌리지 않기 위해 여기에서만 정의한다.
 */

export const ROUTES = {
  /** A-01 랜딩 */
  landing: '/',

  /** A-02 인원 수 */
  createMembers: '/create/members',
  /** A-03 닉네임 입력 (A-04 검증 에러 포함) */
  createNicknames: '/create/nicknames',
  /** 방 이름 입력 */
  createName: '/create/name',
  /** A-05 방 생성 완료 · 링크 공유 */
  createDone: '/create/done/:shareCode',

  /** A-06 링크 진입 · 닉네임 선택 (만료 시 A-08) */
  joinRoom: '/r/:shareCode',
  /** B-01 정산방 */
  roomHome: '/r/:shareCode/home',
  /** flow #2 결제 내역 등록 — 이번 범위 밖 */
  addExpense: '/r/:shareCode/expenses/new',
} as const;

export function createDonePath(shareCode: string): string {
  return `/create/done/${shareCode}`;
}

export function joinRoomPath(shareCode: string): string {
  return `/r/${shareCode}`;
}

export function roomHomePath(shareCode: string): string {
  return `/r/${shareCode}/home`;
}

export function addExpensePath(shareCode: string): string {
  return `/r/${shareCode}/expenses/new`;
}
