import { useApiResponse } from '@app/composables/use-api-response'
import type {
  Byok,
  Chat,
  Message,
  MessageStages,
  ModelSettings,
  Personality,
  RawApiResponseErrorResponse,
  Upload,
} from '@app/types'
import type { UserPlan } from '@app/constants/user-plan'
import type { AiModel } from '@app/constants/ai-model'

export const chatApi = () => {
  const config = useRuntimeConfig()
  return config.public.api
}

export const wsApi = () => {
  const config = useRuntimeConfig()
  return config.public.ws
}

export interface DiscordAuthorizeResponse {
  success: boolean
  id: string
  email?: string
  name: string
  jwt: string
  plan: UserPlan
}

export const discordAuthorize = async (code: string, redirect: string) => {
  const data = await useFetch<DiscordAuthorizeResponse, RawApiResponseErrorResponse>(
    `${chatApi()}/oauth/discord/authorize`,
    {
      method: 'post',
      body: { code, redirect },
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  return useApiResponse<DiscordAuthorizeResponse>(data)
}

export interface CreateMessageResponse {
  channelId: string
  channel: Chat
  userMessage: Message
  systemMessage: Message
}

export const createMessage = async (
  jwt: string,
  chatId: string | '@new',
  stages: MessageStages,
  model: ModelSettings,
  personalityId?: string,
) => {
  const data = await useFetch<CreateMessageResponse, RawApiResponseErrorResponse>(
    `${chatApi()}/channels/${chatId}/messages`,
    {
      method: 'post',
      body: { stages, model, personalityId },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt,
      },
    },
  )

  return useApiResponse<CreateMessageResponse>(data)
}

export const getChannelMessages = async (
  jwt: string,
  channelId: string,
  limit = 50,
  from?: string,
  to?: string,
) => {
  const data = await useFetch<Message[], RawApiResponseErrorResponse>(
    `${chatApi()}/channels/${channelId}/messages?limit=${limit}}` +
      (from ? `&from=${from}` : '') +
      (to ? `&to=${to}` : ''),
    {
      headers: {
        Authorization: jwt,
      },
    },
  )

  return useApiResponse<Message[]>(data)
}

export const getChannels = async (
  jwt: string,
  limit = 50,
  pins?: boolean,
  from?: string,
  to?: string,
) => {
  const data = await useFetch<Chat[], RawApiResponseErrorResponse>(
    `${chatApi()}/channels?limit=${limit}` +
      (from ? `&from=${from}` : '') +
      (to ? `&to=${to}` : '') +
      (pins ? '&pins=true' : ''),
    {
      headers: {
        Authorization: jwt,
      },
    },
  )

  return useApiResponse<Chat[]>(data)
}

export const pinChannel = async (jwt: string, channelId: string, pin: boolean) => {
  const data = await useFetch<Chat, RawApiResponseErrorResponse>(
    `${chatApi()}/channels/${channelId}/pin`,
    {
      method: 'post',
      body: { pin },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt,
      },
    },
  )

  return useApiResponse<Chat>(data)
}

export const renameChannel = async (jwt: string, channelId: string, name: string) => {
  const data = await useFetch<Chat, RawApiResponseErrorResponse>(
    `${chatApi()}/channels/${channelId}`,
    {
      method: 'put',
      body: { name },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt,
      },
    },
  )

  return useApiResponse<Chat>(data)
}

export const deleteChannel = async (jwt: string, channelId: string) => {
  const data = await useFetch<Chat, RawApiResponseErrorResponse>(
    `${chatApi()}/channels/${channelId}`,
    {
      method: 'delete',
      headers: {
        Authorization: jwt,
      },
    },
  )

  return useApiResponse<Chat>(data)
}

export const uploadFile = async (jwt: string, file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const data = await useFetch<{ value: Upload[] }, RawApiResponseErrorResponse>(
    `${chatApi()}/images/uploads`,
    {
      method: 'post',
      body: formData,
      headers: {
        Authorization: jwt,
      },
    },
  )

  return useApiResponse<{ value: Upload[] }>(data)
}

export type FileExistsResponse = { exists: false } | Upload

export const fileExists = async (jwt: string, sha: string) => {
  const data = await useFetch<FileExistsResponse, RawApiResponseErrorResponse>(
    `${chatApi()}/images/exists?sha=${sha}`,
    {
      headers: {
        Authorization: jwt,
      },
    },
  )

  return useApiResponse<FileExistsResponse>(data)
}

export interface GetByoksResponse {
  connections: Byok[]
}

export const getByoks = async (jwt: string) => {
  const data = await useFetch<GetByoksResponse, RawApiResponseErrorResponse>(`${chatApi()}/byok`, {
    headers: {
      Authorization: jwt,
    },
  })

  return useApiResponse<GetByoksResponse>(data)
}

export interface CreateByokResponse {
  status: boolean
  byok: Byok
}

export const createByok = async (jwt: string, name: string, key: string, models: AiModel[]) => {
  const data = await useFetch<CreateByokResponse, RawApiResponseErrorResponse>(
    `${chatApi()}/byok`,
    {
      method: 'post',
      body: { name, key, models },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt,
      },
    },
  )

  return useApiResponse<CreateByokResponse>(data)
}

export interface UpdateByokResponse {
  status: boolean
  byok: Byok
}

export const updateByok = async (
  jwt: string,
  id: string,
  name?: string,
  key?: string,
  models?: AiModel[],
) => {
  const data = await useFetch<UpdateByokResponse, RawApiResponseErrorResponse>(
    `${chatApi()}/byok/${id}`,
    {
      method: 'patch',
      body: { name, key, models },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt,
      },
    },
  )

  return useApiResponse<UpdateByokResponse>(data)
}

export interface DeleteByokResponse {
  status: boolean
}

export const deleteByok = async (jwt: string, id: string) => {
  const data = await useFetch<DeleteByokResponse, RawApiResponseErrorResponse>(
    `${chatApi()}/byok/${id}`,
    {
      method: 'delete',
      headers: {
        Authorization: jwt,
      },
    },
  )

  return useApiResponse<DeleteByokResponse>(data)
}

export interface GetPersonalitiesResponse {
  personalities: Personality[]
}

export const getPersonalities = async (jwt: string) => {
  const data = await useFetch<GetPersonalitiesResponse, RawApiResponseErrorResponse>(
    `${chatApi()}/personalities`,
    {
      headers: {
        Authorization: jwt,
      },
    },
  )

  return useApiResponse<GetPersonalitiesResponse>(data)
}

export interface CreatePersonalityResponse {
  personality: Personality
}

export const createPersonality = async (
  jwt: string,
  name: string,
  prompt: string,
  isDefault: boolean = false,
) => {
  const data = await useFetch<CreatePersonalityResponse, RawApiResponseErrorResponse>(
    `${chatApi()}/personalities`,
    {
      method: 'post',
      body: { name, prompt, isDefault },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt,
      },
    },
  )

  return useApiResponse<CreatePersonalityResponse>(data)
}

export interface UpdatePersonalityResponse {
  personality: Personality
}

export const updatePersonality = async (
  jwt: string,
  id: string,
  name?: string,
  prompt?: string,
  isDefault?: boolean,
) => {
  const data = await useFetch<UpdatePersonalityResponse, RawApiResponseErrorResponse>(
    `${chatApi()}/personalities/${id}`,
    {
      method: 'patch',
      body: { name, prompt, isDefault },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwt,
      },
    },
  )

  return useApiResponse<UpdatePersonalityResponse>(data)
}

export const deletePersonality = async (jwt: string, id: string) => {
  const data = await useFetch<{ success: boolean }, RawApiResponseErrorResponse>(
    `${chatApi()}/personalities/${id}`,
    {
      method: 'delete',
      headers: {
        Authorization: jwt,
      },
    },
  )

  return useApiResponse<{ success: boolean }>(data)
}
