/**
 * 정산방 규칙 상수. (기능 요구사항 FR-01)
 *
 * 화면 어디에서도 숫자를 직접 쓰지 않고 여기만 참조한다.
 */

/** 닉네임 최소 길이. */
export const NICKNAME_MIN_LENGTH = 1;

/** 닉네임 최대 길이. */
export const NICKNAME_MAX_LENGTH = 10;

/** 방을 만들 수 있는 최소 인원. */
export const MIN_MEMBER_COUNT = 2;

/**
 * 인원 수 상한.
 * 요구사항에 명시된 값이 아니라 입력 필드가 무한히 늘어나는 것을 막는 프론트 가드다.
 */
export const MAX_MEMBER_COUNT = 10;

/** 인원 수 화면(A-02)의 초기값. */
export const DEFAULT_MEMBER_COUNT = 4;

/** 방이 유지되는 기간(일). 이후 방과 링크가 모두 삭제된다. */
export const ROOM_TTL_DAYS = 7;

/**
 * 방 생성 시 보내는 기본 통화.
 * 통화 선택 UI 가 아직 없어 상수로 고정한다. 서버 기본값으로 대체 가능하면 요청에서 빼도 된다.
 */
export const DEFAULT_CURRENCY = 'JPY' as const;
