type Message =
  | {
      id: number;
      type: 'system';
      text: string;
    }
  | {
      id: number;
      type: 'date';
      text: string;
    }
  | {
      id: number;
      type: 'other' | 'mine' | 'ai';
      sender: string;
      avatarColor: string;
      avatarText: string;
      text: string;
      time: string;
      unread?: number;
      showAvatar?: boolean;
      showName?: boolean;
    };

export type { Message };

let nextId = 200;
let messages: Message[] = [];
let listeners: (() => void)[] = [];

export const chatStore = {
  getMessages: () => messages,

  setMessages: (msgs: Message[]) => {
    messages = msgs;
    listeners.forEach((fn) => fn());
  },

  addMessage: (msg: Omit<Message, 'id'>) => {
    const newMsg = { ...msg, id: nextId++ } as Message;
    messages = [...messages, newMsg];
    listeners.forEach((fn) => fn());
    return newMsg;
  },

  subscribe: (fn: () => void) => {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  },
};
