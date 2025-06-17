<script setup lang="ts">
import type { Message, MessageStage } from '@app/types'
import { MessageStageContentType } from '@app/constants/message-stage-content-type'
import { MessageStageType } from '@app/constants/message-stage-type'
import { MessageRole } from '@app/constants/message-role'
import UserChatCommands from '@app/components/chat/UserChatCommands.vue'

const message = defineProps<Message>()

const isReasoning = (stage: MessageStage) => {
  return stage.type === MessageStageType.Think
}

const isError = (stage: MessageStage) => {
  return stage.type === MessageStageType.Error
}

const isLoadingImage = (stage: MessageStage) => {
  return !(stage.content?.value || '').startsWith('http')
}

const isText = (stage: MessageStage) => {
  return stage.content?.type === MessageStageContentType.Text
}

const isImage = (stage: MessageStage) => {
  return stage.content?.type === MessageStageContentType.Vision
}

const isFile = (stage: MessageStage) => {
  return (
    stage.content?.type === MessageStageContentType.File ||
    stage.content?.type === MessageStageContentType.Audio
  )
}

const isSearch = (stage: MessageStage) => {
  return stage.content?.type === MessageStageContentType.Search
}

const isLink = (stage: MessageStage) => {
  return stage.content?.type === MessageStageContentType.Url
}
</script>

<template>
  <div class="flex flex-col gap-2 reply">
    <template v-if="message.stages.length">
      <div
        v-for="stage in message.stages"
        :key="stage.id || stage.content?.value"
        class="message-container"
        :class="{
          'message-container-error': isError(stage),
          'message-container-user': message.role === MessageRole.User,
          'message-container-bot': message.role === MessageRole.Assistant,
        }"
      >
        <div v-if="isText(stage)" class="whitespace-pre-wrap break-words">
          <Text as="p" variant="bodyMd" :tone="isReasoning(stage) ? 'muted' : 'content'">
            <MarkdownRenderer :markdown="stage.content?.value || ''" />
          </Text>
        </div>
        <div v-else-if="isImage(stage)">
          <div v-if="isLoadingImage(stage)" class="image image-loading"/>
          <img v-else alt="image" :src="stage.content!.value" class="image no-drag-no-select" >
        </div>
        <div v-else-if="isFile(stage)">
          <Text as="p" variant="bodyMd" tone="muted">
            {{ stage.content?.value }}
          </Text>
        </div>
        <div v-else-if="isSearch(stage)">
          <Text as="p" variant="bodyMd" tone="muted">
            {{ stage.content?.value }}
          </Text>
        </div>
        <div v-else-if="isLink(stage)">
          <Text as="p" variant="bodyMd" tone="muted">
            {{ stage.content?.value }}
          </Text>
        </div>
      </div>
      <template v-if="message.role === MessageRole.Assistant">
        <ChatCommands :used-model="message.model.id" :copy-content="stages.find(isText)?.content?.value || ''"/>
      </template>
      <template v-else>
        <UserChatCommands class="ml-auto" :copy-content="stages.find(isText)?.content?.value || ''"/>
      </template>
    </template>
    <div v-else class="message-container message-container-skeleton" />
  </div>
</template>

<style scoped lang="scss">
@use '@app/assets/styles/mixins';

.message-container {
  max-width: 768px;

  &-user {
    margin-left: auto;
    margin-right: 0;
    border-radius: 24px;
    background: var(--color-default);
    border: 1px solid var(--color-border-default);
    padding: 12px 18px;
  }

  &-bot {
    margin-right: auto;
    margin-left: 0;
  }

  &-skeleton {
    @include mixins.skeleton(75%, 40px, 12px);
  }

  &-error {
    padding: 12px 18px;
    border-radius: 24px;
    background: var(--color-critial-bg);
    border: 1px solid var(--color-critical-border);
  }
}

.image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  @apply max-w-96;

  &-loading {
    @include mixins.skeleton(300px, 300px, 24px);
  }
}

.reply .commands {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.reply:hover .commands {
  opacity: 1;
}
</style>
