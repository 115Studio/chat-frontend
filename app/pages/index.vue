<script setup lang="ts">
import { useAuthStore } from '@app/store/auth.store'
import { useChatsStore } from '@app/store/chats.store'
import { MessageStageType } from '@app/constants/message-stage-type'
import { MessageStageContentType } from '@app/constants/message-stage-content-type'
import { AiModel } from '@app/constants/ai-model'
import { convertStorageToAiRequest } from '@app/lib/utils'
import { Inputs, useInputsStore } from '@app/store/inputs.store'
import { MagicNumber } from '@app/constants/magic-number'
import { useNewChatStore } from '@app/store/new-chat.store'

const router = useRouter()
const authStore = useAuthStore()
const chatStore = useChatsStore()

if (!authStore.isAuthenticated) {
  router.push('/login')
}

const inputsStore = useInputsStore('@new')()

if (!inputsStore.getInput(Inputs.SelectedModel)?.model) {
  inputsStore.writeInput(Inputs.SelectedModel, {
    model: AiModel.GoogleGemini20Flash,
  })
}

const createMessageEvent = async () => {
  const convertedStages = convertStorageToAiRequest(inputsStore.getInput(Inputs.ChatInput)?.stages)

  inputsStore.writeInput(Inputs.ChatInput, {
    stages: [
      {
        type: MessageStageType.Text,
        content: {
          type: MessageStageContentType.Text,
          value: '',
        },
      },
    ]
  })

  const internalId = crypto.randomUUID()

  chatStore.createChat({
    id: '@new',
    name: MagicNumber.NameShowSkeleton,
    internalId,
    ownerId: authStore.id,

    isPinned: false,
    isBranch: false,
    isTemporary: false,
    isPublic: false,

    createdAt: Date.now()
  })

  void useNewChatStore().newChat(router, internalId, authStore.jwt, convertedStages, {
    id: inputsStore.getInput(Inputs.SelectedModel)?.model,
    flags: inputsStore.getInput(Inputs.ReasoningLevel)?.level !== undefined
      ? [ inputsStore.getInput(Inputs.ReasoningLevel)?.level ] : [],
  })

  return router.push('/chat/@new')
}

// const createNewChat = () => {
//   const chat = chatStore.createChat(input.value)
//   input.value = ''
//
//   if (chat) router.push(`/chat/${chat.id}`)
//   else toast.error('Failed to create chat')
// }

definePageMeta({
  layout: 'sidebar',
})
</script>

<template>
  <div class="page-container">
    <div class="page-content mx-auto w-full items-center text-center">
      <Text as="h1" variant="headingLg">Welcome home.</Text>
      <div class="top-content mt-12">
        <ChatInput @create-message-event="createMessageEvent" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@app/assets/styles/row';
@use '@app/assets/styles/mixins';

.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
}

.page-content {
  flex: 1;
  margin-top: 28svh;
}

.container {
  background: var(--color-default);
  border: 1px solid var(--color-border-default);
  width: 292px;
  padding: 32px;
  border-radius: 16px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  min-height: 400px; /* Adjust height as needed */
}

.container__group-item {
  margin-bottom: 18px;
}

.bottom-content {
  margin-top: auto;
}

.top-content {
  margin-bottom: auto;
}

.row {
  &__group {
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__label {
    margin-bottom: 12px;

    &.skeleton {
      @include mixins.skeleton(128px, 16px, 4px);
    }
  }
}
</style>
