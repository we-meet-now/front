# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # 개발 서버 실행 (localhost:5173, 포트 고정)
npm run build     # 타입 체크 후 프로덕션 빌드
npm run lint      # ESLint 실행
npm run format    # Prettier 포맷 (src/**/*.{ts,tsx,css,css.ts})
```

## Architecture

### 기술 스택
- **React 19** + **TypeScript** + **Vite**
- **vanilla-extract** — 타입 안전 CSS-in-JS (`.css.ts` 파일)
- **TanStack Query** — 서버 상태 관리
- **react-router-dom v7** — 라우팅
- **vite-plugin-svgr** — SVG를 React 컴포넌트로 import (`icon.svg?react`)

### 디렉토리 구조 원칙

```
src/
├── api/                  # API 레이어
│   ├── client.ts         # fetch 래퍼 (apiClient)
│   ├── config.ts         # BASE_URL, API_MODE ('server' | 'local')
│   ├── create-meeting/   # 도메인별 API 함수
│   └── query/            # TanStack Query 훅 (useXxx 형태)
├── components/           # 라우터 유틸 컴포넌트 (PrivateRoute 등)
├── pages/                # 라우트별 페이지 컴포넌트
│   └── [페이지명]/
│       ├── index.tsx     # 페이지 컴포넌트
│       └── page.css.ts   # 페이지 전용 스타일
├── store/                # 전역 상태 (vanilla JS pub-sub 패턴, Zustand 없음)
├── ui/                   # 공통 UI 컴포넌트
│   ├── tokens/           # 색상·타이포그래피 원시값
│   ├── theme.css.ts      # createGlobalTheme → vars (CSS custom properties)
│   └── [컴포넌트명]/
│       ├── component.tsx
│       └── component.css.ts
└── utils/                # 순수 유틸 함수
```

### 스타일링 패턴
- 모든 스타일은 `.css.ts` 파일에 vanilla-extract로 작성
- 디자인 토큰은 `vars` (theme.css.ts에서 export)로 참조: `vars.color.blue500`, `vars.fontSize.m`
- 동적 스타일은 `assignInlineVars` + CSS 변수 조합 사용 (Button 컴포넌트 참고)
- 클래스 조합은 `src/ui/utils.ts`의 `cx()` 유틸 사용

### 라우팅 구조
- **모임방 내부** (`/meeting/:roomId/*`): `MeetingLayout`이 GNB 포함한 레이아웃 제공
- **채팅방** (`/room/:roomId/*`): 채팅·AI·캘린더·투표·정산 서브 라우트
- **마이페이지** (`/mypage/*`): 상세·지도·친구·알림설정·캘린더설정 서브 라우트
- **인증 보호**: `PrivateRoute` 컴포넌트 — localStorage의 `accessToken` 유무로 판단, 없으면 `/onboarding` 리다이렉트

### API 설정
- `api/config.ts`의 `API_MODE`로 서버/로컬 모드 전환
- Vercel 배포 시 `/api/*` 경로는 `vercel.json`의 rewrite로 백엔드(`3.36.132.253:8000`)에 프록시

### 경로 alias
`@/`는 `src/`를 가리킴 (vite.config.ts에서 설정)

### 모임 생성 퍼널
`pages/create-meeting/useFunnel.ts`의 `useFunnel` 훅으로 단계형 UI 구현 — step 배열을 받아 goNext/goPrev/goTo 제공
