import { FC } from "react";
import { Alert } from "./alert.tsx";
import { ChatMessage } from "./chat-message.tsx";
import { USER_ID } from "../const.ts";
import { useConversationMessages } from "../hooks/use-conversation-messages.ts";

export interface ChatListProps {
  id: string;
}

export const ChatList: FC<ChatListProps> = ({ id }) => {
  const messages = useConversationMessages(id);

  if (!messages.data?.length) {
    return <Alert type="info">Send a message below to get started!</Alert>;
  }

  return (
    <div className="chat-list">
      {messages.data
        ?.flatMap((item) => item.messages)
        .map(({ message, senderId }, i) => (
          <ChatMessage
            key={`${senderId}-${i}`}
            message={message}
            type={senderId === USER_ID ? "sent" : "received"}
          />
        ))}
    </div>
  );
};
