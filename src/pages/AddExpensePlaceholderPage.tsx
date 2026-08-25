import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { AppBar } from '../components/layout/AppBar';
import { BottomActionBar } from '../components/layout/BottomActionBar';
import { MobileFrame } from '../components/layout/MobileFrame';
import { roomHomePath } from '../constants/routes';

/**
 * flow #2(결제 내역 등록) 자리표시.
 *
 * B-01 의 진입점이 끊기지 않도록 경로만 잡아둔다. 화면은 다음 범위에서 만든다.
 */
export function AddExpensePlaceholderPage() {
  const navigate = useNavigate();
  const { shareCode = '' } = useParams<{ shareCode: string }>();

  return (
    <MobileFrame>
      <AppBar backTo={roomHomePath(shareCode)} />
      <EmptyState
        title="결제 내역 등록은 준비 중이에요"
        description="스크린샷 업로드와 직접 입력 화면이 이어서 붙습니다."
      />
      <BottomActionBar>
        <Button onClick={() => navigate(roomHomePath(shareCode))}>정산방으로</Button>
      </BottomActionBar>
    </MobileFrame>
  );
}
