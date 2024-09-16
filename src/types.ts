export enum Product {
  virtualEvent = "virtualEvent",
  community = "community",
}

export enum ContextType {
  university = "university",
  isDirectConversation = "isDirectConversation",
  isNewsFeedConversation = "isNewsFeedConversation",
}

export interface Context {
  id: string;
  type: ContextType;
}

export enum Action {
  manage = "manage",
  readConversation = "readConversation",
  sendMessage = "sendMessage",
  updateMessage = "updateMessage",
  deleteMessage = "deleteMessage",
  resolveMessage = "resolveMessage",
  pinMessage = "pinMessage",
  createPoll = "createPoll",
}

export enum Subject {
  user = "User",
  all = "all",
}

export enum AccountRole {
  applicant = "applicant",
  mentor = "mentor",
  staff = "staff",
  university = "university",
  admin = "admin",
}

export interface Conditions {
  userId?: string;
  universityId?: string;
  accountRole?: AccountRole;
}

export interface Permission {
  action: Action;
  subject: Subject;
  conditions?: Conditions;
}

export enum TagType {
  subTopic = "subTopic",
}

export interface Tag {
  id: string;
  type: TagType;
}

export interface CreateChatConversationDto {
  product: Product;
  context: Context[];
  permissions?: Permission[];
  tags?: Tag[];
  memberIds?: string[];
  blockedMemberIds?: string[];
}

export type ContextIdType = string | Product | boolean;

export interface Context {
  id: string;
  type: ContextType;
}

export interface ContextSchema {
  id: ContextIdType;
  type: ContextType;
}

export interface ChatConversationDto {
  id: string;
  permissions: Permission[];
  product: Product;
  context: ContextSchema[];
  memberIds: string[];
  blockedMemberIds: string[];
  lastMessageId: string;
  pinnedMessages?: string[];
  tags?: Tag[];
}

export interface ChatConversationMessageDto {
  conversationId: string;
  messages: [{ message: string; senderId: string }];
}

export interface GetMessageDto {
  conversationId: string;
  offsetId?: string;
  limit: number;
  tag?: string;
}

export interface UnreadMessageDto {
  id: string;
  unreadMessageCount: number;
}

export interface MessageDto {
  conversationId: string;
  text: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  created: Date;
  resolved: boolean;
  sender: { id: string };
  deleted: boolean;
}
