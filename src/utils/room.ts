/** 방 이름마다 고정된 색을 쓰도록 이름에서 색상(hue)을 뽑는다 */
export const getRoomAvatarColor = (name: string) =>
  `hsl(${[...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360},60%,50%)`;

/** 읽지 않은 메시지가 없으면 배지를 숨기도록 null을 돌려준다 */
export const formatUnreadCount = (count: number) => {
  if (!count || count <= 0) return null;
  return count > 99 ? '99+' : String(count);
};

/**
 * 모임 종류·시간이 없을 때 같은 이름의 방을 구분하도록 생성일을 보여준다.
 * 서버가 시간대 없이(로컬 시각) 내려주므로 그대로 날짜만 읽는다.
 */
export const formatCreatedDate = (inpDate: string) => {
  const date = new Date(inpDate);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getMonth() + 1}월 ${date.getDate()}일 생성`;
};
