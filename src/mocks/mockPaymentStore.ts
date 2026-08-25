/**
 * 목 모드의 결제 내역 저장소.
 *
 * 서비스 계층 뒤에 숨어 있으므로 화면 코드는 이 파일을 모른다.
 * 새로고침해도 남도록 sessionStorage 에 함께 보관한다.
 */

import type { CreatePaymentInput, Payment } from '../types/payment';

const STORAGE_KEY = 'oide:mock:payments';

function read(): Payment[] {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Payment[]) : [];
  } catch {
    return [];
  }
}

function write(payments: Payment[]): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
  } catch {
    // 저장 실패는 이번 세션 동작에 영향이 없다.
  }
}

export const mockPaymentStore = {
  findByRoom(roomId: string): Payment[] {
    return read()
      .filter((payment) => payment.roomId === roomId)
      .sort(byPaidAtDesc);
  },

  createMany(
    roomId: string,
    payerMemberId: string,
    inputs: CreatePaymentInput[],
  ): Payment[] {
    const now = new Date().toISOString();
    const created: Payment[] = inputs.map((input, index) => ({
      id: `pay-${Date.now()}-${index}`,
      roomId,
      payerMemberId,
      splitGroupId: null,
      merchant: input.merchant,
      paidAt: input.paidAt,
      amount: input.amount,
      currency: input.currency,
      splitMethod: null,
      // 등록 직후에는 아무것도 정산 대상이 아니다. B-02 에서 정산할 항목만 고른다.
      includedInSettlement: false,
      receiptImageId: input.receiptImageId,
      createdAt: now,
      updatedAt: now,
    }));

    write([...read(), ...created]);
    return created;
  },

  setIncluded(paymentId: string, included: boolean): Payment {
    const payments = read();
    const target = payments.find((payment) => payment.id === paymentId);
    if (!target) {
      throw new Error(`결제 내역을 찾을 수 없습니다: ${paymentId}`);
    }
    target.includedInSettlement = included;
    target.updatedAt = new Date().toISOString();
    write(payments);
    return target;
  },
};

/** 최신 결제가 위로 오도록 정렬한다. 시각을 모르는 건 뒤로 보낸다. */
function byPaidAtDesc(a: Payment, b: Payment): number {
  if (!a.paidAt) return 1;
  if (!b.paidAt) return -1;
  return new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime();
}
