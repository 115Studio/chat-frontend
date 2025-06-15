import { defineStore } from 'pinia'
import type { Chat } from '@app/types'

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

      this.chats.push(chat)
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

    deleteChat(id: string): boolean {
      const before = this.chats.length
      this.chats = this.chats.filter((chat) => chat.id !== id)
      const after = this.chats.length

      return before !== after
    },
  },
})
