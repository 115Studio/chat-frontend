import { defineStore } from 'pinia'
import { UserPlan } from '@app/constants/user-plan'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    jwt: '',
    id: '',
    email: '' as string | undefined,
    name: '',
    plan: UserPlan.None as UserPlan,
  }),
  persist: {
    storage: localStorage,
  },

  actions: {
    signOut() {
      this.isAuthenticated = false
      this.jwt = ''
      this.id = ''
      this.email = undefined
      this.plan = UserPlan.None
    }
  }
})
