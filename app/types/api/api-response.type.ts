import type { ErrorCode } from '@app/constants/errors'
import type { ApiError } from '@app/types/api/api-error.type'

export type RawApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError

export type RawApiResponseSuccess<T> = T
export type RawApiResponseError = `[${ErrorCode}] ${string}`

export interface RawApiResponseErrorResponse {
  data: {
    error: RawApiResponseError
    message: string
  }
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError

export type ApiResponseSuccess<T> = {
  ok: true
  result: T
  errors: []
}

export type ApiResponseError = {
  ok: false
  result: null
  errors: ApiError[]
}
