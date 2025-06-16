export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isOpen: true,
    isMobile: false, // todo
  }),

  actions: {
    toggle() {
      this.isOpen = !this.isOpen
    },

    open() {
      this.isOpen = true
    },

    close() {
      this.isOpen = false
    },
  },

  persist: {
    storage: localStorage,
  },
})
