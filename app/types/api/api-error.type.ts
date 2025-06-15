import type { ErrorCode } from '@app/constants/errors'

export interface ApiError {
  code: ErrorCode
  message: string
}
