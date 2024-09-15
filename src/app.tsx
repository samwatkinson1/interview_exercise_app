import { useMutation } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { USER_ID } from "./const.ts";
import { ContextType, Product } from "./types.ts";
import { createConversation } from "./services/api.ts";

export const App: FC = () => {
  const conversation = useMutation({
    mutationFn: createConversation,
  });

  useEffect(() => {
    if (conversation.data || conversation.isPending) {
      return;
    }
    conversation.mutate({
      product: Product.virtualEvent,
      context: [{ id: "string", type: ContextType.university }],
      memberIds: [USER_ID],
    });
  }, []);

  console.log(conversation.data?.id);

  return (
    <div className="h-screen w-screen">
      <header className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="indicator -m-1.5 p-1.5">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
            {/* todo */}
            <span className="indicator-item badge badge-error">1</span>
          </a>
        </div>
      </header>

      {conversation.isPending && (
        <span className="loading loading-spinner loading-lg"></span>
      )}
      {conversation.isSuccess && (
        <main className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4"></main>
      )}
    </div>
  );
};
