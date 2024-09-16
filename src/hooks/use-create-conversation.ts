import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { UNIVERSITY_ID, USER_ID } from "../const.ts";
import { createConversation } from "../services/api.ts";
import { ContextType, Product } from "../types.ts";

export const useCreateConversation = () => {
  const mutation = useMutation({
    mutationKey: ["create-conversation"],
    mutationFn: createConversation,
  });

  useEffect(() => {
    if (mutation.data || mutation.isPending) return;
    mutation.mutate({
      product: Product.virtualEvent,
      context: [{ id: UNIVERSITY_ID, type: ContextType.university }],
      memberIds: [USER_ID],
    });
  }, [mutation]);

  return mutation;
};
