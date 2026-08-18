export function cx(...classNames: unknown[]) {
  return classNames.filter(Boolean).join(' ');
}

// 모바일 프레임 기준 반응형 치수 (MobileLayout maxWidth: 440px)
const FLUID_MAX_WIDTH = 440;
const FLUID_MIN_WIDTH = 320;

// px 값을 뷰포트 폭에 비례해 줄어드는 clamp() 값으로 변환
export function fluid(px: number) {
  const minPx = px * (FLUID_MIN_WIDTH / FLUID_MAX_WIDTH);
  const vw = (px / FLUID_MAX_WIDTH) * 100;
  return `clamp(${minPx.toFixed(2)}px, ${vw.toFixed(3)}vw, ${px}px)`;
}

// 텍스트 전용: 가독성 최소 크기(minPx)를 직접 보장하면서 화면 폭에 비례해 커지는 clamp() 값
export function fluidText(minPx: number, maxPx: number) {
  const vw = (maxPx / FLUID_MAX_WIDTH) * 100;
  return `clamp(${minPx}px, ${vw.toFixed(3)}vw, ${maxPx}px)`;
}

// 세로 뷰포트 높이에 비례해 줄어드는 clamp() 값 (뷰포트 높이가 작아질 때 스크롤이 생기지 않도록)
const FLUID_MAX_HEIGHT = 800; // 일반적인 모바일 세로 높이 기준

export function fluidHeight(minPx: number, maxPx: number) {
  const vh = (maxPx / FLUID_MAX_HEIGHT) * 100;
  return `clamp(${minPx}px, ${vh.toFixed(3)}vh, ${maxPx}px)`;
}
