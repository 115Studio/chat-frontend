<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
import { useAuthStore } from '@app/store/auth.store'
import { wsApi } from '@app/composables/api'
import type { Chat, Message } from '@app/types'
import { WebSocketOpCode } from '@app/constants/web-socket-op-code'
import { subscribeOp, useWebSocket } from '@app/composables/use-web-socket'
import { useChatMessagesStore } from '@app/store/chat-messages.store'
import { useChatsStore } from '@app/store/chats.store'

const auth = useAuthStore()

const route = useRoute()
const router = useRouter()

if (!auth.isAuthenticated) {
  router.push('/login')
}

let init = false

async function main() {
  if (init) return
  init = true

  const chatId = computed(() => route.path.split('chat/')[1] ?? '@new')

  const chatsStore = useChatsStore()

  const messageStoreMap = new Map<string, ReturnType<ReturnType<typeof useChatMessagesStore>>>()

  const messagesStore = (id: string): ReturnType<ReturnType<typeof useChatMessagesStore>> => {
    let store = messageStoreMap.get(id)

    if (!store) {
      store = useChatMessagesStore(id)()
      messageStoreMap.set(id, store)
    }

    return store
  }

  const ws = useWebSocket(wsApi(), auth.jwt)

  subscribeOp<'channel', Chat>(ws, WebSocketOpCode.ChannelCreate, ({ channel }) => {
    chatsStore.createChat(channel)
  })

  subscribeOp<'channel', Chat>(ws, WebSocketOpCode.ChannelUpdate, ({ channel }) => {
    chatsStore.updateChat(channel)
  })

  subscribeOp<'channelId', string>(ws, WebSocketOpCode.ChannelDelete, ({ channelId }) => {
    chatsStore.deleteChat(channelId)
    messageStoreMap.delete(channelId)
    messagesStore(channelId).clearMessages()
  })

  subscribeOp<'message', Message>(ws, WebSocketOpCode.MessageCreate, ({ message }) => {
    messagesStore(message.channelId).addMessage(message)
  })

  subscribeOp<any, any>(
    ws,
    WebSocketOpCode.MessageStageUpdate,
    ({ messageId, channelId, stageUpdate, ts }) => {
      messagesStore(channelId).updateMessagePartial(messageId, stageUpdate, ts)
    },
  )

  subscribeOp<'message', Message>(ws, WebSocketOpCode.MessageUpdate, ({ message }) => {
    messagesStore(message.channelId).updateMessage(message)
  })

  subscribeOp<'messageId', string>(ws, WebSocketOpCode.MessageDelete, (d) => {
    for (const store of messageStoreMap.values()) {
      store.deleteMessage(d.messageId)
    }
  })
}

watch(
  () => auth.isAuthenticated,
  (isAuthenticated) => {
    if (isAuthenticated) {
      main().catch(console.error)
    }
  },
  { immediate: true },
)
</script>

<template>
  <Html lang="ru" dir="ltr">
    <Head>
      <Title>115 Chat</Title>
      <Meta property="og:title" content="115 Chat" />
      <Meta name="theme-color" content="#16191E" />
      <Meta property="og:site_name" content="115 Chat" />
      <Meta property="og:type" content="website" />
      <Link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
    </Head>
    <Body class="w-full max-h-screen">
      <NuxtLayout>
        <Toaster
          position="top-center"
          :expand="false"
          theme="light"
          :duration="5000"
          :toast-options="{
            style: {
              background: 'var(--color-default)',
              color: 'var(--color-text-default)',
              border: '1px solid var(--color-border-default)',
              borderRadius: '8px',
            },
          }"
        />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style lang="scss">
.transition-page-enter-active,
.transition-page-leave-active {
  transition: 0.25s;
  transform-origin: center 96px;
}
.transition-page-leave-active {
  position: relative;
}
.transition-page-enter-from {
  opacity: 0;
  transform: scale(0.99);
}
.transition-page-leave-to {
  opacity: 0;
}

.transition-page-fast-enter-active,
.transition-page-fast-leave-active {
  transition: 0.15s;
  transform-origin: center 96px;
}
.transition-page-fast-leave-active {
  position: relative;
}
.transition-page-fast-enter-from {
  opacity: 0;
  transform: scale(0.99);
}
.transition-page-fast-leave-to {
  opacity: 0;
}
</style>
