export enum ErrorCode {
  UnknownError,
  Unauthorized = 1000,
  AuthorizationFailed,
  ThirdPartyFailure,
  RateLimitExceeded,
  UnknownChannel,
}
