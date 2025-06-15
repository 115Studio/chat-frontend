import type { Message, MessageStage } from '@app/types'
import { MessageStageContentType } from '@app/constants/message-stage-content-type'

export interface UnprocessedStage {
  id: string
  stage: MessageStage
  ts: number
}

export const useChatMessagesStore = (id: string) =>
  defineStore('channel-id-' + id, {
    state: () => ({
      messages: [] as Message[],
      unprocessedStages: [] as UnprocessedStage[],
    }),

    persist: {
      storage: localStorage,
    },

    actions: {
      addMessage(message: Message) {
        const existingIndex = this.messages.findIndex((m) => m.id === message.id)
        if (existingIndex !== -1) {
          this.messages[existingIndex] = message
        } else {
          this.messages.push(message)
        }
      },

      updateMessage(message: Message) {
        const index = this.messages.findIndex((m) => m.id === message.id)
        if (index !== -1) {
          this.messages[index] = message

          const unprocessedStages = this.unprocessedStages.filter((s) => s.id === message.id)

          if (unprocessedStages.length > 0) {
            this.unprocessedStages = this.unprocessedStages.filter((s) => s.id !== message.id)

            for (const stage of unprocessedStages) {
              if (message.updatedAt && message.updatedAt < stage.ts)
                this.updateMessagePartial(message.id, stage.stage, stage.ts)
            }
          }
        }
      },

      updateMessagePartial(id: string, stage: MessageStage, ts: number) {
        const messageIndex = this.messages.findIndex((m) => m.id === id)

        console.log('messageIndex', messageIndex)

        if (messageIndex === -1) {
          this.unprocessedStages.push({ id, stage, ts })
          return
        }

        const message = this.messages[messageIndex]!

        const stageIndex = message.stages.findIndex((s) => s.id === stage.id)

        message.updatedAt = Date.now()

        if (stageIndex === -1) {
          message.stages.push(stage)
          this.messages[messageIndex] = message
          return message
        }

        const contentType = stage.content?.type

        if (typeof contentType === 'undefined' || !stage.content) {
          message.stages[stageIndex] = stage
          this.messages[messageIndex] = message
          return message
        }

        switch (contentType) {
          case MessageStageContentType.Text:
            {
              const messageStage = message.stages[stageIndex]!

              if (messageStage.content?.type !== MessageStageContentType.Text) {
                message.stages[stageIndex] = stage
                this.messages[messageIndex] = message
                return message
              }

              if (typeof messageStage.content.value !== 'string') {
                message.stages[stageIndex] = stage
                this.messages[messageIndex] = message
                return message
              }

              messageStage.content.value += stage.content.value
              this.messages[messageIndex] = message
            }
            break
          default:
            message.stages[stageIndex] = stage
            this.messages[messageIndex] = message
            return message
        }
      },

      deleteMessage(id: string): boolean {
        const before = this.messages.length
        this.messages = this.messages.filter((message) => message.id !== id)
        const after = this.messages.length

        return before !== after
      },

      clearMessages() {
        this.messages = []
        this.unprocessedStages = []
      },

      syncMessagesWithBackend(messages: Message[]) {
        const existingIds = new Set(this.messages.map((m) => m.id))
        const newMessages: Message[] = []

        for (const message of messages) {
          if (!existingIds.has(message.id)) newMessages.push(message)
          else this.updateMessage(message)
        }

        this.messages.push(...newMessages)
      },
    },
  })
