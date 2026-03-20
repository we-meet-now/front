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
