import type { AsyncData } from 'nuxt/app'
import type {
  ApiResponseError,
  ApiResponseSuccess,
  RawApiResponseError,
  RawApiResponseErrorResponse,
  RawApiResponseSuccess,
} from '@app/types'
import { ErrorCode } from '@app/constants/errors'
import type { ApiError } from '@app/types/api/api-error.type'

export const parseError = (e: RawApiResponseError | string): ApiError => {
  console.log('Parsing error:', e)

  const [codeRaw, ...msgs] = e.split(' ')
  const code = Number(codeRaw?.replace(/[\[\]]/g, ''))

  if (isNaN(code)) {
    return {
      code: ErrorCode.UnknownError,
      message: JSON.stringify(e),
    }
  }

  return {
    code,
    message: msgs.join(' ') || 'An unknown error occurred.',
  }
}

export const useApiResponse = <T = unknown>(
  data: Awaited<
    AsyncData<
      RawApiResponseSuccess<T> | undefined | null,
      RawApiResponseErrorResponse | undefined | null
    >
  >,
) => {
  if (data.status.value === 'success') {
    return {
      ok: true,
      result: data.data.value || null,
      errors: [],
    } as ApiResponseSuccess<T>
  } else {
    const error = data.error.value?.data.error

    return {
      ok: false,
      result: null,
      errors: [parseError(error ?? `[${ErrorCode.UnknownError}]: Unknown error`)],
    } as ApiResponseError
  }
}
