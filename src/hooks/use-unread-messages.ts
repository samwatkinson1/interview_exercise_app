import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { getUnreadMessages } from "../services/api.ts";

export const useUnreadMessages = (id?: string) => {
  const mutation = useMutation({
    mutationKey: ["unread-messages", id],
    mutationFn: getUnreadMessages,
  });

  useEffect(() => {
    if (!id || mutation.data || mutation.isPending) return;
    mutation.mutate({ id });
  }, [mutation, id]);

  return mutation;
};
