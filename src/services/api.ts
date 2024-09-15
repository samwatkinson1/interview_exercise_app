import { QueryClient } from "@tanstack/react-query";
import { API_KEY, BASE_URL } from "../const.ts";
import { ChatConversationDto, CreateChatConversationDto } from "../types.ts";

export const queryClient = new QueryClient();

export async function createConversation(
  data: CreateChatConversationDto,
): Promise<ChatConversationDto> {
  const resp = await fetch(`${BASE_URL}/conversation`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });
  return resp.json();
}
