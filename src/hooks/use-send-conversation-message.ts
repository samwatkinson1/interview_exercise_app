import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";
import { sendConversationMessage } from "../services/api.ts";
import { ChatMessage, MessageDto } from "../types.ts";

// manually type return value here as we have quite opaque types otherwise through inference
export type UseSendConversationMessageReturn = [
  (text: string) => void,
  UseMutationResult<
    { data: { sendConversationMessage: ChatMessage } },
    Error,
    MessageDto,
    unknown
  >,
];

export const useSendConversationMessage = (
  id?: string,
): UseSendConversationMessageReturn => {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: sendConversationMessage,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["conversation-messages"] }),
  });

  const mutate = useCallback(
    (text: string) => {
      if (!id || mutation.isPending) return;
      return mutation.mutate({ conversationId: id, text });
    },
    [id, mutation],
  );

  return [mutate, mutation];
};
