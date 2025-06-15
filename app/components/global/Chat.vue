<script setup lang="ts">
import ChatCommands from '@app/components/chat/ChatCommands.vue'
</script>

<template>
  <div class="messages w-full flex flex-col gap-y-6">
    <div class="message message--right">
      <div class="message-container">
        <Text as="p" variant="bodyMd">
          Hallo!
        </Text>
      </div>
      <ChatCommands />
    </div>
    <div class="message reply message--left">
      <div>
        <Text as="p" variant="bodyMd">
          Hallo! Ich bin eine KI!
        </Text>
      </div>
      <ChatCommands />
    </div>
    <div class="message-container message message--right">
      <Text as="p" variant="bodyMd">
        💖💖💖
      </Text>
    </div>
    <div class="message reply message--left">
      <div>
        <Text as="p" variant="bodyMd">
          Lieb dich auch!
        </Text>
      </div>
      <ChatCommands/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.message-container {
  max-width: 768px;
  padding: 12px 18px;
  border-radius: 24px;
}

.message-background {
  background: var(--color-default);
  border: 1px solid var(--color-border-default);
}

.message {
  &--left {
    @apply mr-auto;
  }

  &--right {
    @apply ml-auto;
  }
}

.reply .commands {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.reply:hover .commands {
  opacity: 1;
}

.messages {
  display: flex;
  width: 100%;
}

.button {
  @apply p-1.5 rounded-lg hover:bg-gray-300 transition-colors;
}
</style>
