type SystemMessage = {
  id: number;
  type: 'system';
  text: string;
};

type DateMessage = {
  id: number;
  type: 'date';
  text: string;
};

type ChatMessage = {
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

type Message = SystemMessage | DateMessage | ChatMessage;
type NewMessage = Omit<SystemMessage, 'id'> | Omit<DateMessage, 'id'> | Omit<ChatMessage, 'id'>;

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

  addMessage: (msg: NewMessage) => {
    const newMsg: Message = { ...msg, id: nextId++ };
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
