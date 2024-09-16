import { FC, useState } from "react";
import { Alert } from "./components/alert.tsx";
import { ChatList } from "./components/chat-list.tsx";
import { Toast } from "./components/toast.tsx";
import { useCreateConversation } from "./hooks/use-create-conversation.ts";
import { useUnreadMessages } from "./hooks/use-unread-messages.ts";
import { useSendConversationMessage } from "./hooks/use-send-conversation-message.ts";

export const App: FC = () => {
  const conversation = useCreateConversation();
  const unread = useUnreadMessages(conversation.data?.id);
  const [sendMessage, { isError, isPending }] = useSendConversationMessage(
    conversation.data?.id,
  );

  const [message, setMessage] = useState("");

  async function handleSend() {
    if (!message) return;
    sendMessage(message);
    setMessage("");
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="mx-auto flex max-w-7xl items-center justify-between pt-6 lg:pt-8 px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="indicator -m-1.5 p-1.5">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
            <span className="indicator-item badge badge-error">
              {unread.data?.unreadMessageCount ?? 0}
            </span>
          </a>
        </div>
      </header>

      <div className="divider" />

      {conversation.isPending && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {conversation.isError && (
        <Alert type="error">
          An error occurred, {conversation.error.message}
        </Alert>
      )}
      {conversation.isSuccess && (
        <main className="flex flex-col flex-auto pb-6 lg:pb-8 px-6 lg:px-8 justify-between">
          <ChatList id={conversation.data.id} />
          <div className="flex">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full join-item"
              disabled={isPending}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="btn btn-primary"
              disabled={!message || isPending}
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </main>
      )}
      {isError && (
        <Toast>
          <Alert type="error">Failed to send message!</Alert>
        </Toast>
      )}
    </div>
  );
};
