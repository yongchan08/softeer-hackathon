/**
 * 결제 내역 · 분담 그룹 도메인 타입.
 *
 * flow #2(결제 내역 등록)·#3(그룹 분담) 에서 사용된다.
 * 이번 범위(flow #1)에서는 B-01 정산방의 "내역 있음" 판정에만 쓰이므로
 * 서비스 계층은 아직 만들지 않고 타입만 확정해둔다.
 */

import type { CurrencyCode, IsoDateTime } from './room';

/** SPLIT_GROUP.type */
export type SplitGroupType =
  /** 방 전체 인원. 방마다 하나씩 기본 존재하며 삭제할 수 없다. */
  | 'ALL'
  /** 사용자가 만든 참여자 조합. */
  | 'CUSTOM';

/** PAYMENT.split_method */
export type SplitMethod =
  /** N빵. 나누어떨어지지 않는 나머지는 결제자가 부담한다. */
  | 'EQUAL'
  /** 참여자별 금액 직접 입력. 합계가 결제 금액과 같아야 한다. */
  | 'CUSTOM';

/** SPLIT_GROUP */
export interface SplitGroup {
  id: string;
  roomId: string;
  /** 참여자 닉네임을 나열한 이름 (예: "민서·하늘"). ALL 그룹은 "전체". */
  name: string;
  type: SplitGroupType;
  memberIds: string[];
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

/** PAYMENT */
export interface Payment {
  id: string;
  roomId: string;
  /** 실제로 돈을 낸 사람. 기본값은 내역을 등록한 본인이다. */
  payerMemberId: string;
  /** 아직 어떤 그룹에도 담기지 않았으면 null. 정산 시 ALL 그룹으로 자동 귀속된다. */
  splitGroupId: string | null;
  /** 결제처. 스크린샷에서 못 읽었으면 null. */
  merchant: string | null;
  /** 결제 시각. 스크린샷에서 못 읽었으면 null. */
  paidAt: IsoDateTime | null;
  /** 결제 통화 기준 금액. 소수점이 있는 통화가 있어 문자열로 다룬다. */
  amount: string;
  currency: CurrencyCode;
  /** 분담 방식이 아직 정해지지 않았으면 null. */
  splitMethod: SplitMethod | null;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

/** PAYMENT_SHARE — 결제 1건에 대한 참여자별 부담액. */
export interface PaymentShare {
  id: string;
  paymentId: string;
  memberId: string;
  /** 결제 통화 기준 부담 금액. */
  shareAmount: string;
}

/** B-01 에서 쓰는 참여자별 등록 요약. */
export interface MemberPaymentSummary {
  memberId: string;
  nickname: string;
  /** 이 참여자가 결제자로 등록한 내역 건수. */
  paymentCount: number;
}
