import type { ErrorCode } from '@app/constants/error-code'

export interface ApiError {
  code: ErrorCode
  message: string
}
