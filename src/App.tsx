import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { CreateRoomDraftProvider } from './hooks/useCreateRoomDraft';
import { AddExpensePlaceholderPage } from './pages/AddExpensePlaceholderPage';
import { CreateRoomMemberCountPage } from './pages/CreateRoomMemberCountPage';
import { CreateRoomNamePage } from './pages/CreateRoomNamePage';
import { CreateRoomNicknamesPage } from './pages/CreateRoomNicknamesPage';
import { JoinRoomPage } from './pages/JoinRoomPage';
import { LandingPage } from './pages/LandingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RoomCreatedPage } from './pages/RoomCreatedPage';
import { RoomHomePage } from './pages/RoomHomePage';

/**
 * flow #1 (방 개설 · 참여) 라우팅.
 *
 * 방 생성 위저드(A-02 → A-03 → 방 이름)는 입력을 공유하므로 Provider 로 감싼다.
 */
export function App() {
  return (
    <BrowserRouter>
      <CreateRoomDraftProvider>
        <Routes>
          <Route path={ROUTES.landing} element={<LandingPage />} />

          <Route path={ROUTES.createMembers} element={<CreateRoomMemberCountPage />} />
          <Route path={ROUTES.createNicknames} element={<CreateRoomNicknamesPage />} />
          <Route path={ROUTES.createName} element={<CreateRoomNamePage />} />
          <Route path={ROUTES.createDone} element={<RoomCreatedPage />} />

          <Route path={ROUTES.joinRoom} element={<JoinRoomPage />} />
          <Route path={ROUTES.roomHome} element={<RoomHomePage />} />
          <Route path={ROUTES.addExpense} element={<AddExpensePlaceholderPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CreateRoomDraftProvider>
    </BrowserRouter>
  );
}
