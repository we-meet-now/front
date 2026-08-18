// TODO(백엔드 연동): 초대장 이미지 선택이 브라우저 메모리(모듈 변수)에만 저장됨 — 새로고침하거나
// 다른 참여자가 접속하면 공유되지 않음. 백엔드에 모임(room)의 초대장 이미지 필드/API가 없음(신규 개발 필요).
// roomId 기준으로 presetId 또는 업로드 이미지 URL을 저장·조회하도록 교체해야 함.
export type InviteCardSelection = {
  presetId: string | null;
  customImageUrl: string | null;
};

let selection: InviteCardSelection = { presetId: 'p1', customImageUrl: null };
let listeners: (() => void)[] = [];

const notify = () => listeners.forEach((fn) => fn());

export const inviteCardStore = {
  getSelection: () => selection,

  selectPreset: (presetId: string) => {
    selection = { presetId, customImageUrl: null };
    notify();
  },

  selectCustomImage: (url: string) => {
    selection = { presetId: null, customImageUrl: url };
    notify();
  },

  subscribe: (fn: () => void) => {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  },
};
