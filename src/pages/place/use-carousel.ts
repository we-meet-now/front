import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 스크롤 스냅 캐러셀. 중앙에 가장 가까운 카드를 activeIndex로 잡고
 * 거리에 따라 축소·투명도를 준다. (pages/place/index.tsx의 동작을 훅으로 정리)
 */
export const useCarousel = (itemCount: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | undefined>(undefined);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateVisuals = useCallback(() => {
    const box = containerRef.current;
    if (!box) return;

    const boxRect = box.getBoundingClientRect();
    const boxCenter = boxRect.left + boxRect.width / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(box.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(boxCenter - cardCenter);
      const progress = Math.min(distance / boxRect.width, 1);

      card.style.transform = `scale(${1 - progress * 0.08})`;
      card.style.opacity = `${1 - progress * 0.45}`;

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  const onScroll = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(updateVisuals);
  };

  // 목록이 바뀌면(카테고리 전환·재추천) 스크롤을 처음으로 되돌린다.
  // 그러지 않으면 짧아진 목록에서 activeIndex가 범위를 벗어난다.
  // 스크롤 위치가 반영된 뒤 측정해야 하므로 rAF로 한 프레임 미룬다.
  useEffect(() => {
    const box = containerRef.current;
    if (!box) return;

    box.scrollLeft = 0;
    const id = requestAnimationFrame(updateVisuals);
    return () => cancelAnimationFrame(id);
  }, [itemCount, updateVisuals]);

  useEffect(() => {
    window.addEventListener('resize', updateVisuals);
    return () => {
      window.removeEventListener('resize', updateVisuals);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updateVisuals]);

  const scrollToIndex = (index: number) => {
    const card = containerRef.current?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const dragHandlers = {
    onMouseDown: (e: React.MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - (containerRef.current?.offsetLeft ?? 0);
      scrollLeft.current = containerRef.current?.scrollLeft ?? 0;
    },
    onMouseMove: (e: React.MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      e.preventDefault();
      const x = e.pageX - containerRef.current.offsetLeft;
      containerRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
    },
    onMouseUp: () => {
      isDragging.current = false;
    },
    onMouseLeave: () => {
      isDragging.current = false;
    },
  };

  return { containerRef, activeIndex, onScroll, scrollToIndex, dragHandlers };
};
