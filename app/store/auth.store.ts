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
  persist: true,
})
