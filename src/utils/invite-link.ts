/** enterCode는 채팅방 입장 API를 붙일 때 쓰도록 채팅방 경로까지 그대로 넘긴다 */
export const getRoomPath = (roomId: string, enterCode?: string | null) => {
  const path = `/room/${encodeURIComponent(roomId)}/chat`;
  return enterCode ? `${path}?code=${encodeURIComponent(enterCode)}` : path;
};

/** 초대 링크는 모두 이 함수로 만든다. 진입 후 회원/게스트 분기는 InvitePage가 맡는다 */
export const buildInviteLink = (roomId: string, enterCode: string) =>
  `${window.location.origin}/invite/${encodeURIComponent(roomId)}?code=${encodeURIComponent(enterCode)}`;

/**
 * redirect 쿼리는 외부에서 조작할 수 있으므로 앱 내부 경로만 허용한다.
 * `//evil.com`, `/\evil.com`처럼 프로토콜 상대 URL로 해석되는 값은 막는다.
 */
export const getSafeRedirect = (redirect: string | null) => {
  if (!redirect || !redirect.startsWith('/')) return null;
  if (redirect.startsWith('//') || redirect.startsWith('/\\')) return null;
  return redirect;
};
