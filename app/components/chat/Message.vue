<script setup lang="ts">
import type { Message, MessageStage } from '@app/types'
import { MessageStageContentType } from '@app/constants/message-stage-content-type'
import { MessageStageType } from '@app/constants/message-stage-type'

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
  return stage.content?.type === MessageStageContentType.File || stage.content?.type === MessageStageContentType.Audio
}

const isSearch = (stage: MessageStage) => {
  return stage.content?.type === MessageStageContentType.Search
}

const isLink = (stage: MessageStage) => {
  return stage.content?.type === MessageStageContentType.Url
}
</script>

<template>
  <div>
    <template v-if="message.stages.length" v-for="stage in message.stages">
      <div class="message-container" :class="{ 'message-container-error': isError(stage) }">
        <div v-if="isText(stage)">
          <Text as="p" variant="bodyMd" :tone="isReasoning(stage) ? 'muted' : 'content'">
            {{ stage.content?.value }}
          </Text>
        </div>
        <div v-else-if="isImage(stage)">
          <div v-if="isLoadingImage(stage)" class="image image-loading"></div>
          <img v-else :src="stage.content!.value" class="image"/>
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
    </template>
    <div v-else class="message-container message-container-skeleton"></div>
  </div>
</template>

<style scoped lang="scss">
@use '@app/assets/styles/mixins';

.message-container {
  max-width: 768px;
  padding: 12px 18px;
  border-radius: 24px;
  background: var(--color-default);
  border: 1px solid var(--color-border-default);

  &-skeleton {
    @include mixins.skeleton(100%, 40px, 12px);
  }

  &-error {
    background: var(--color-critical);
  }
}

.image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;

  &-loading {
    @include mixins.skeleton(100%, 200px, 12px);
  }
}
</style>
