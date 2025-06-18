import type { MessageStages } from '@app/types'
import type { AiModel } from '@app/constants/ai-model'
import { createMessage } from '@app/composables/api'
import { Inputs, useInputsStore } from '@app/store/inputs.store'
import { useChatMessagesStore } from '@app/store/chat-messages.store'
import { toast } from 'vue-sonner'
import { useChatsStore } from '@app/store/chats.store'
import type { AiModelFlag } from '@app/constants/ai-model-flag'
import type { Router } from 'vue-router'

export const useNewChatStore = defineStore('new-chat', {
  state: () => ({
    id: '',
    internalId: '',
  }),

  actions: {
    async newChat(router: Router, internalId: string, jwt: string, stages: MessageStages, model: { id: AiModel, flags: AiModelFlag[] }) {
      this.internalId = internalId

      const response = await createMessage(
        jwt,
        '@new',
        stages,
        model,
        // TODO personality settings
      )

      if (!response.ok) {
        toast.error('Failed to create message')
        return router.push('/')
      }

      const { channel, userMessage, systemMessage } = response.result

      this.id = channel.id

      useChatsStore().updateChatInternal(internalId, channel)

      useInputsStore(channel.id)().writeInput(Inputs.SelectedModel, {
        model: model.id,
      })

      console.log(model.flags, model.flags[0])
      useInputsStore(channel.id)().writeInput(Inputs.ReasoningLevel, {
        level: model.flags[0],
      })

      const messages = useChatMessagesStore(channel.id)()
      messages.addMessage(userMessage)
      messages.addMessage(systemMessage)

      return router.push(`/chat/${channel.id}`)
    },

    reset() {
      this.id = ''
      this.internalId = ''
    },
  }
})
