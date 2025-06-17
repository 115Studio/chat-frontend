import { defineStore } from 'pinia'
import type { Chat } from '@app/types'
import { deleteChannel } from '@app/composables/api'
import { useAuthStore } from '@app/store/auth.store'

export const useChatsStore = defineStore('chats', {
  state: () => ({
    chats: [] as Chat[],
  }),

  persist: {
    storage: localStorage,
  },

  actions: {
    createChat(chat: Chat) {
      const existingIndex = this.chats.findIndex((c) => c.id === chat.id)

      if (existingIndex !== -1) {
        const existing = this.chats[existingIndex]!

        Object.assign(existing, chat)
        this.chats[existingIndex] = existing

        return existing
      }

      this.chats.unshift(chat)
      return chat
    },

    updateChat(chat: Chat) {
      const existingIndex = this.chats.findIndex((c) => c.id === chat.id)

      if (existingIndex !== -1) {
        const existing = this.chats[existingIndex]!

        Object.assign(existing, chat)
        this.chats[existingIndex] = existing

        return existing
      }

      return null
    },

    async deleteChat(id: string): Promise<boolean> {
      this.chats = this.chats.filter((c) => c.id !== id)

      const result = await deleteChannel(useAuthStore().jwt, id)

      return result.ok
    },

    getChat(id: string): Chat | null {
      const chat = this.chats.find((c) => c.id === id)
      return chat || null
    },

    syncChatsWithBackend(chats: Chat[]) {
      this.chats = chats.map((chat) => {
        const existingIndex = this.chats.findIndex((c) => c.id === chat.id)

        if (existingIndex !== -1) {
          const existing = this.chats[existingIndex]!
          Object.assign(existing, chat)
          return existing
        }

        return chat
      })
    },

    getPinnedChats(): Chat[] {
      return this.chats.filter((chat) => chat.isPinned)
    },

    getUnpinnedChats(): Chat[] {
      return this.chats.filter((chat) => !chat.isPinned)
    },
  },
})
