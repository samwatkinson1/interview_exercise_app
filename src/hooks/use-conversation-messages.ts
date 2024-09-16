import { useQuery } from "@tanstack/react-query";
import { getConversationMessages } from "../services/api.ts";

export const useConversationMessages = (id?: string) => {
  return useQuery({
    queryKey: ["conversation-messages", id],
    queryFn: () => getConversationMessages(id ?? ""),
    enabled: !!id,
  });
};
