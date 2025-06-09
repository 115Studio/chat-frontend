import { useLocalStorage } from '@vueuse/core'

export default defineNuxtRouteMiddleware((to) => {
  const code = useLocalStorage('discord-auth-code', null)
  if (to.query.code && to.path == '/login') {
    code.value = to.query.code as any
  }
})
