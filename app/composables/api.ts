import { useApiResponse } from '@app/composables/use-api-response'
import type { RawApiResponseError } from '@app/types'
import type { UserPlan } from '@app/constants/user-plan'

export const chatApi = (() => {
  const config = useRuntimeConfig()
  return config.public.api
})

export interface DiscordAuthorizeResponse {
  success: boolean
  id: string
  email?: string
  name: string
  jwt: string
  plan: UserPlan
}

export const discordAuthorize = async (code: string, redirect: string) => {
  const data = await useFetch<DiscordAuthorizeResponse, RawApiResponseError>(
    `${chatApi()}/oauth/discord/authorize`,
    {
      method: 'post',
      body: { code, redirect },
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return useApiResponse<DiscordAuthorizeResponse>(data)
}
