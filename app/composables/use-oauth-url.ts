export const useOauthUrl = () => {
  const urlParams = new URL(window.location.href)
  return `${urlParams.protocol}//${urlParams.host}${urlParams.pathname}`
}
