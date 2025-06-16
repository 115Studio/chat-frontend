export const useSidebarStore = defineStore('sidebar', () => {
  const isOpen = ref(true)
  const isMobile = ref(false) // todo

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return {
    isOpen,
    isMobile,
    toggle,
    open,
    close,
    persist: {
      storage: localStorage,
    }
  }
})
