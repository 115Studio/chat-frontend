import type { MessageStages } from '@app/types'
import type { AiModel } from '@app/constants/ai-model'
import { createMessage } from '@app/composables/api'
import { Inputs, useInputsStore } from '@app/store/useInputsStore'
import { useChatMessagesStore } from '@app/store/chat-messages.store'
import { toast } from 'vue-sonner'
import { useChatsStore } from '@app/store/chats.store'

export const useNewChatStore = defineStore('new-chat', {
  state: () => ({
    id: '',
    internalId: '',
  }),

  actions: {
    async newChat(internalId: string, jwt: string, stages: MessageStages, model: AiModel) {
      this.internalId = internalId

      const response = await createMessage(
        jwt,
        '@new',
        stages,
        {
          // TODO model settings
          id: model,
          flags: [],
        },
        // TODO personality settings
      )

      if (!response.ok) {
        return toast.error('Failed to create message')
      }

      const { channel, userMessage, systemMessage } = response.result

      this.id = channel.id

      useChatsStore().updateChatInternal(internalId, channel)

      useInputsStore(channel.id)().writeInput(Inputs.SelectedModel, {
        model,
      })

      const messages = useChatMessagesStore(channel.id)()
      messages.addMessage(userMessage)
      messages.addMessage(systemMessage)
    },

    reset() {
      this.id = ''
      this.internalId = ''
    },
  }
})
