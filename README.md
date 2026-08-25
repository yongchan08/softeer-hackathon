# 여행 정산 — 프론트엔드

해외여행 공동 경비를 링크 하나로 정산하는 모바일 웹.
현재 **flow #1 (방 개설 · 참여)** 과 **flow #2 (결제 내역 등록)** 가 구현되어 있다.

가입·설치 없이 링크로 참여하고, 정산방은 만든 날부터 **7일 뒤 자동 삭제**된다.

## 실행

```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:5173
```

| 스크립트 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 타입 체크 + 프로덕션 빌드 |
| `npm run typecheck` | 타입 체크만 |
| `npm run preview` | 빌드 결과 미리보기 |

## 환경변수

| 변수 | 기본값 | 설명 |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8080/api` | 백엔드 베이스 URL |
| `VITE_USE_MOCK` | `true` | `true`면 `src/mocks`로 동작. **백엔드를 붙일 때 `false`** |
| `VITE_SHARE_LINK_ORIGIN` | (비움) | 공유 링크에 쓸 origin. 비우면 현재 접속 origin |

우선순위는 **호스팅 대시보드 환경변수 > `.env.local` > `.env.production` > `.env`** 다.
Vite 는 실행 시점에 이미 존재하는 환경변수를 `.env` 파일보다 우선한다.

## 배포 (Vercel)

`vercel.json` 과 `.env.production` 이 저장소에 있어 추가 설정 없이 배포된다.

- **`vercel.json`** — SPA 리라이트. 이게 없으면 `/r/{shareCode}` 공유 링크를 새 탭에서 열 때
  Vercel 이 404 를 낸다. 링크 공유가 이 서비스의 핵심 플로우라 필수다
- **`.env.production`** — 백엔드가 없는 동안 배포본도 목데이터로 뜨게 한다

백엔드가 준비되면 `.env.production` 을 지우거나, Vercel > Settings > Environment Variables 에
`VITE_USE_MOCK=false` 와 `VITE_API_BASE_URL` 을 넣는다. 대시보드 값이 파일보다 우선한다.

> `VITE_USE_MOCK` 없이 배포하면 존재하지 않는 `/api` 로 요청이 나가 화면에
> `요청을 처리하지 못했어요. (404)` 만 뜬다. 이 경우 브라우저 콘솔에 원인을 안내하는 경고가 찍힌다.

## 백엔드 연결

1. `docs/api-contract.md`의 엔드포인트를 구현한다
2. `.env.local`에서 `VITE_USE_MOCK=false`, `VITE_API_BASE_URL`을 실제 주소로
3. **화면 코드는 건드릴 필요가 없다.** 목/실제 분기는 `src/services/*.ts` 안에만 있다

`docs/api-contract.md` 하단의 **ERD 보완 제안 3건**을 먼저 확인할 것.

## 화면

| ID | 화면 | 경로 |
|---|---|---|
| A-01 | 랜딩 | `/` |
| A-02 | 인원 수 | `/create/members` |
| A-03 · A-04 | 닉네임 입력 · 검증 에러 | `/create/nicknames` |
| — | 방 이름 입력 | `/create/name` |
| A-05 | 생성 완료 · 링크 공유 | `/create/done/:shareCode` |
| A-06 | 링크 진입 · 닉네임 선택 | `/r/:shareCode` |
| A-08 | 만료된 방 | `/r/:shareCode` (410 응답 시) |
| B-01 | 정산방 (빈 상태 / 내역 있음) | `/r/:shareCode/home` |

### flow #2 — 결제 내역 등록

| ID | 화면 | 경로 |
|---|---|---|
| C-01 | 등록 방식 선택 | `/r/:shareCode/expenses/new` |
| C-02 | 선택한 스크린샷 확인 | `/r/:shareCode/expenses/upload` |
| C-04 | 파싱 중 | `/r/:shareCode/expenses/parsing` |
| C-05 · C-07 · C-08 | 파싱 결과 · 필드 누락 | `/r/:shareCode/expenses/review` |
| C-06 | 파싱 항목 수정 | `/r/:shareCode/expenses/review/:draftId` |
| C-09 | 직접 입력 | `/r/:shareCode/expenses/manual` |
| B-02 | 내 결제 내역 · 정산 포함 선택 | `/r/:shareCode/expenses` |

### 목 모드로 화면 확인하기

| 상황 | 방법 |
|---|---|
| B-01 **빈 상태** | `/`에서 방을 새로 만들면 결제 내역이 없다 |
| B-01 **내역 있음** | `/r/8fj2kd/home` — 시드 방(오사카 여행)에 준영의 내역 5건 |
| A-08 **만료** | `/r/expired` — 8일 전에 만들어진 방 |
| **오류 상태** | `VITE_USE_MOCK=false` + 없는 주소 → A-06·B-01에 재시도 UI |
| A-04 **검증 에러** | 닉네임을 중복 / 11자 / 공백만 입력 |
| C-05 **파싱 결과** | 아무 이미지나 3장 올린다. 목은 장마다 다른 결과를 준다 |
| C-07 · C-08 **필드 누락** | 2장째는 금액을, 3장째는 통화를 못 읽은 것으로 내려온다 |
| C-04 **전체 실패** | 목에서는 재현되지 않는다. 실제 API 가 `drafts: []` 만 줄 때 나온다 |

새로 만든 방은 `sessionStorage`에 보관되므로 탭을 닫으면 사라진다.

## 구조

```
src/
├── api/          fetch 래퍼 · 환경변수 (여기서만 import.meta.env 를 읽는다)
├── services/     화면이 호출하는 유일한 데이터 진입점. 목/실제 분기가 여기 있다
├── mocks/        목 데이터와 저장소. 백엔드가 붙으면 쓰이지 않는다
├── types/        API·도메인 타입. ERD 와 1:1 대응
├── constants/    라우트 · 정산방 규칙(1~10자, 최소 2명, 7일 …)
├── hooks/        useAsync(로딩·오류·재시도) · 방 생성 위저드 · 스크린샷 등록 흐름 · 로컬 신원
├── utils/        닉네임 검증 · 클립보드 · 공유 링크 · 금액·날짜 포맷
├── components/   layout(프레임·앱바·하단바) / common(버튼·입력·아바타…) / room / expense
├── pages/        화면 1개 = 파일 1개
└── styles/       tokens.css(디자인 토큰) · global.css
```

**규칙**

- 화면 컴포넌트에 데이터를 하드코딩하지 않는다. 목데이터는 `src/mocks`에만 둔다
- 모든 조회·생성은 `src/services`를 거친다. 컴포넌트가 `fetch`나 `localStorage`를 직접 쓰지 않는다
- 숫자 규칙(1~10자, 최소 2명, 7일, 통화)은 `src/constants/roomRules.ts`만 참조한다
- 색·간격은 `src/styles/tokens.css`의 CSS 변수를 쓴다

## 반응형

모바일 웹 전제다. 390px는 디자인 기준 폭이지 고정 폭이 아니다.

- **~430px**: 화면 전체 폭
- **431px~**: 430px 컬럼이 가운데 정렬 (데스크톱 전용 레이아웃은 없다)
- `100dvh`, `env(safe-area-inset-bottom)`, 입력 `font-size: 16px`(iOS 자동 확대 방지),
  터치 타겟 44px 이상을 적용했다

320 / 360 / 375 / 390 / 430 / 768 / 1280px에서 가로 스크롤이 없는 것을 확인했다.

## 와이어프레임과 다른 점

의도적으로 다르게 구현한 3가지다. 되돌리려면 각각 한 곳만 고치면 된다.

1. **A-03의 CTA가 `다음`** — Figma는 `정산방 만들기`지만, 뒤에 방 이름 화면이 삽입되면서
   같은 문구 버튼이 연속 2개가 됐다. 실제로 방을 만드는 건 방 이름 화면이다.
   → `src/pages/CreateRoomNicknamesPage.tsx`
2. **A-02 스테퍼의 `−`는 인원 2일 때만 비활성** — Figma는 인원 4에서도 회색이라 컴포넌트 상태 오류로 봤다.
   → `src/components/common/Stepper.tsx`
3. **인원 수 상한 10명** — 요구사항에 없는 프론트 가드다. 입력 칸이 무한히 늘어나는 것을 막는다.
   → `src/constants/roomRules.ts`의 `MAX_MEMBER_COUNT`

## 의존성

런타임은 `react` · `react-dom` · `react-router-dom` 셋뿐이다.
스타일은 CSS Modules(Vite 내장)이라 추가 의존성이 없다.
