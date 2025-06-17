import type { MessageStageContentType } from '@app/constants/message-stage-content-type'
import type { MessageStageType } from '@app/constants/message-stage-type'
import type { MessageState } from '@app/constants/message-state'
import type { MessageRole } from '@app/constants/message-role'
import type { AiModel } from '@app/constants/ai-model'
import type { AiModelFlag } from '@app/constants/ai-model-flag'

export interface ModelSettings {
  id: AiModel
  key?: string
  flags?: AiModelFlag[]
}

export interface MessageStageContent {
  type: MessageStageContentType
  value?: string
}

export interface MessageStage {
  id?: string
  type: MessageStageType
  content?: MessageStageContent
}

export type MessageStages = MessageStage[]
export type StreamStageUpdate = Required<MessageStage>

export interface StreamMessageUpdate {
  messageId: string,
  stageUpdate: StreamStageUpdate,
  ts: number
}

export interface Message {
  id: string
  groupId: string // For grouping messages in one slider
  channelId: string
  userId: string

  state: MessageState
  role: MessageRole

  model: ModelSettings
  stages: MessageStages

  createdAt: number
  updatedAt?: number
}

export interface Chat {
  id: string
  internalId: string
  name: string
  ownerId: string

  // Flags for the chat
  isPinned?: boolean
  isBranch?: boolean
  isTemporary?: boolean
  isPublic?: boolean

  createdAt: number
}

export interface Upload {
  id: string
  userId: string
  sha: string
  mime: string
  size: number
  url: string
  createdAt: number
}

export interface Byok {
  id: string
  userId: string

  name: string
  models: AiModel[]

  createdAt: number
  updatedAt?: number
}

export interface Personality {
  id: string
  userId: string

  name: string
  default: boolean

  prompt: string

  createdAt: number
  updatedAt?: number
}
