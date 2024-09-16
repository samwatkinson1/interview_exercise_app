import { QueryClient } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";
import { API_KEY, API_BASE_URL, USER_ID, GQL_BASE_URL, JWT } from "../const.ts";
import {
  ChatConversationDto,
  ChatConversationMessageDto,
  ChatMessage,
  CreateChatConversationDto,
  MessageDto,
  UnreadMessageDto,
} from "../types.ts";

export const gqlClient = new GraphQLClient(GQL_BASE_URL);

export const queryClient = new QueryClient();

export const conversationPermissions = [
  {
    action: "manage",
    subject: "all",
    conditions: { accountRole: "admin" },
  },
  {
    action: "readConversation",
    subject: "User",
    conditions: {
      userId: {
        $in: "conversation.memberIds",
        $nin: "conversation.blockedMemberIds",
      },
    },
  },
  {
    action: "sendMessage",
    subject: "User",
    conditions: {
      userId: {
        $in: "conversation.memberIds",
        $nin: "conversation.blockedMemberIds",
      },
    },
  },
  {
    action: "updateMessage",
    subject: "User",
    conditions: {
      userId: {
        $eq: "message.senderId",
        $nin: "conversation.blockedMemberIds",
      },
    },
  },
  {
    action: "deleteMessage",
    subject: "User",
    conditions: {
      universityId: { $in: "conversation.universityIds" },
      accountRole: "university",
    },
  },
  {
    action: "deleteMessage",
    subject: "User",
    conditions: {
      universityId: { $in: "conversation.universityIds" },
      accountRole: "mentor",
    },
  },
  {
    action: "deleteMessage",
    subject: "User",
    conditions: {
      universityId: { $in: "conversation.universityIds" },
      accountRole: "staff",
    },
  },
  {
    action: "deleteMessage",
    subject: "User",
    conditions: {
      userId: { $eq: "message.senderId" },
      accountRole: "applicant",
    },
  },
];

export async function createConversation(
  data: CreateChatConversationDto,
): Promise<ChatConversationDto> {
  const resp = await fetch(`${API_BASE_URL}/conversation`, {
    method: "POST",
    body: JSON.stringify({ ...data, permissions: conversationPermissions }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
  });
  return resp.json();
}

export async function getConversationMessages(
  id: string,
): Promise<ChatConversationMessageDto[]> {
  const params = new URLSearchParams({
    conversationIds: id,
    // mock dates
    startDate: "2024-09-15",
    endDate: "2024-09-16",
  });
  const resp = await fetch(
    `${API_BASE_URL}/conversation/messages?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    },
  );
  return resp.json();
}

export async function getUnreadMessages(data: {
  id: string;
}): Promise<UnreadMessageDto | undefined> {
  const params = new URLSearchParams({ conversationIds: data.id });
  const resp = await fetch(
    `${API_BASE_URL}/conversation/unread-message-count/${USER_ID}?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    },
  );
  const result: UnreadMessageDto[] = await resp.json();
  return result.find(({ id }) => id === data.id);
}

const sendConversationMessageMutation = gql`
  mutation ($messageDto: MessageDto!) {
    sendConversationMessage(messageDto: $messageDto) {
      id
      text
      created
      resolved
      sender {
        id
      }
      deleted
    }
  }
`;

export async function sendConversationMessage(
  data: MessageDto,
): Promise<{ data: { sendConversationMessage: ChatMessage } }> {
  gqlClient.setHeader("Authorization", `JWT ${JWT}`);
  return gqlClient.request(sendConversationMessageMutation, {
    messageDto: data,
  });
}
