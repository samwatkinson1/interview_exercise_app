import { FC } from "react";

export interface ChatMessageProps {
  message: string;
  type: "sent" | "received";
}

export const ChatMessage: FC<ChatMessageProps> = ({ type, message }) => {
  return (
    <div className={`chat ${type === "received" ? "chat-start" : "chat-end"}`}>
      <div className="chat-bubble">{message}</div>
    </div>
  );
};
