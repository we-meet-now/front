// TODO(백엔드 연동): 투표 데이터가 브라우저 메모리(모듈 변수)에만 존재함 — 새로고침하거나 다른 참여자가
// 접속하면 공유되지 않음. 백엔드에 투표 관련 기능이 아예 없음(신규 개발 필요): 장소 후보 등록/조회, 투표 API가 필요하고,
// getPlaces/addPlace/vote를 API 호출로 교체해야 함(실시간 반영이 필요하면 채팅과 마찬가지로 웹소켓 브로드캐스트도 고려).
export type PollPlace = {
  id: number;
  name: string;
  address: string;
  votes: number;
};

let nextId = 100;
let places: PollPlace[] = [];
let listeners: (() => void)[] = [];

const notify = () => listeners.forEach((fn) => fn());

export const pollStore = {
  getPlaces: () => places,

  addPlace: (name: string, address: string) => {
    // 중복 방지
    if (places.some((p) => p.name === name)) return;
    places = [...places, { id: nextId++, name, address, votes: 0 }];
    notify();
  },

  vote: (id: number) => {
    places = places.map((p) => (p.id === id ? { ...p, votes: p.votes + 1 } : p));
    notify();
  },

  subscribe: (fn: () => void) => {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  },
};
