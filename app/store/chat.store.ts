import { defineStore } from 'pinia'

interface ChatDTO {
  id: string
  name: string
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    chats: [] as ChatDTO[],
  }),

  actions: {
    createChat(name: string): ChatDTO {
      const newChat: ChatDTO = {
        id: crypto.randomUUID(),
        name,
      }
      this.chats.push(newChat)
      return newChat
    },

    deleteChat(id: string): boolean {
      this.chats = this.chats.filter((chat) => chat.id !== id)
      return !this.chats.some((chat) => chat.id === id)
    },
  },
})
