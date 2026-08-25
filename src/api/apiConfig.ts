/**
 * 환경변수 기반 API 설정.
 * import.meta.env 를 읽는 곳은 이 파일 하나로 제한한다.
 */

/** 백엔드 베이스 URL. 끝의 슬래시는 제거한다. */
export const API_BASE_URL: string = (
  import.meta.env.VITE_API_BASE_URL ?? '/api'
).replace(/\/+$/, '');

/** true 이면 서비스 계층이 src/mocks 의 목데이터로 응답한다. */
export const USE_MOCK: boolean = import.meta.env.VITE_USE_MOCK === 'true';

/**
 * 공유 링크에 표시할 origin.
 * 비어 있으면 현재 접속한 origin 을 쓴다 (SSR 이 없으므로 window 를 바로 참조).
 */
export const SHARE_LINK_ORIGIN: string =
  import.meta.env.VITE_SHARE_LINK_ORIGIN || window.location.origin;

/** 네트워크 요청 타임아웃(ms). */
export const REQUEST_TIMEOUT_MS = 10_000;
