import type { Payment } from '../../types/payment';
import { formatAmount, formatTime } from '../../utils/formatters';
import { CheckCircle } from '../common/CheckCircle';
import styles from './ExpenseCheckRow.module.css';

interface ExpenseCheckRowProps {
  payment: Payment;
  onToggle: () => void;
}

/**
 * B-02 의 결제 내역 카드.
 *
 * 오른쪽 원형 체크로 정산에 포함할지 고른다 (FR-02).
 * 고르지 않은 카드도 흐리게 하지 않는다. 아직 안 고른 것이지 못 고르는 것이 아니라
 * 상태는 체크 표시 하나로만 구분한다.
 */
export function ExpenseCheckRow({ payment, onToggle }: ExpenseCheckRowProps) {
  const included = payment.includedInSettlement;

  return (
    <button type="button" className={styles.row} onClick={onToggle} aria-pressed={included}>
      <span className={styles.body}>
        <span className={styles.merchant}>{payment.merchant ?? '결제처 없음'}</span>
        <span className={styles.amount}>{formatAmount(payment.amount, payment.currency)}</span>
        <span className={styles.meta}>
          {payment.paidAt ? `${formatTime(payment.paidAt)} · ` : ''}
          {payment.currency}
        </span>
      </span>
      <CheckCircle checked={included} />
    </button>
  );
}
