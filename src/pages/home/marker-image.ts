import { palette } from '@/ui/tokens/color';
import type { Kakao, KakaoMarkerImage } from '@/utils/kakao';

// 핀 모양 (원 + 아래 꼭짓점). 테두리가 잘리지 않도록 viewBox에 여백을 둔다
const PIN_PATH = 'M14 0C6.27 0 0 6.27 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.27 21.73 0 14 0z';

const pinSvg = (color: string, width: number, height: number) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="-2 -2 32 42">` +
  `<path d="${PIN_PATH}" fill="${color}" stroke="#ffffff" stroke-width="2"/>` +
  `<circle cx="14" cy="14" r="5" fill="#ffffff"/>` +
  `</svg>`;

const createPinImage = (kakao: Kakao, color: string, width: number, height: number) =>
  new kakao.maps.MarkerImage(
    `data:image/svg+xml;charset=utf-8,${encodeURIComponent(pinSvg(color, width, height))}`,
    new kakao.maps.Size(width, height),
    // 핀 끝(아래 가운데)이 실제 좌표에 오도록
    { offset: new kakao.maps.Point(width / 2, height) },
  );

export type MarkerImages = {
  normal: KakaoMarkerImage;
  selected: KakaoMarkerImage;
};

/** 기본 마커는 작은 회색 핀, 선택된 마커는 크고 진한 파란 핀 */
export const createMarkerImages = (kakao: Kakao): MarkerImages => ({
  normal: createPinImage(kakao, palette.grey.grey500, 26, 34),
  selected: createPinImage(kakao, palette.blue.blue600, 38, 50),
});
