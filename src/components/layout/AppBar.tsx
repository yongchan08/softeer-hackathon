import { useNavigate } from 'react-router-dom';
import styles from './AppBar.module.css';

interface AppBarProps {
  /** false 이면 뒤로가기 없이 높이만 확보한다 (랜딩 등). */
  showBack?: boolean;
  /** 지정하면 브라우저 히스토리 대신 이 경로로 이동한다. */
  backTo?: string;
}

/**
 * 서비스 자체 상단 바. OS 상태바는 그리지 않는다.
 */
export function AppBar({ showBack = true, backTo }: AppBarProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
      return;
    }
    navigate(-1);
  };

  return (
    <header className={styles.bar}>
      {showBack && (
        <button type="button" className={styles.backButton} onClick={handleBack} aria-label="뒤로 가기">
          <svg
            className={styles.chevron}
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 1L1 9L9 17"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </header>
  );
}
