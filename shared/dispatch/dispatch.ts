export type Dispatch = (message: Message) => void;

export type Message = {
  name: Name;
  content?: Content;
};

export type Name = "sign-in";
export type Content = Record<string, unknown>;
