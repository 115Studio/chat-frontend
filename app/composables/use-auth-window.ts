import { useLocalStorage } from '@vueuse/core'
import { watch } from 'vue'

export const useAuthWindow = (to: string) => {
  const _getCode = (onCode: (code: string | null) => void) => {
    let called = false

    const win = open()
    if (win === null) {
      onCode(null)
      called = true
      return
    }

    const code = useLocalStorage('discord-auth-code', null)

    const unwatch = watch(() => code.value, (v) => {
      if (v) {
        onCode(v)
        called = true
        unwatch()
        win.close()
        code.value = null
      }

      if (win.closed) {
        onCode(null)
        called = true
        unwatch()
        code.value = null
      }
    })

    const interval = setInterval(() => {
      if (win.closed && !called) {
        onCode(null)
        called = true
        unwatch()
        code.value = null
      }

      if (called) {
        clearInterval(interval)
      }
    }, 100)
  }

  const getCode = () => {
    return new Promise<string | null>(resolve => {
      _getCode(code => resolve(code))
    })
  }

  const open = () => window.open(
    to,
    'modal',
    `height=675,width=875,top=${window.innerHeight / 2 - 575 / 2},left=${window.innerWidth / 2 - 385 / 2}`
  )

  return {
    getCode
  }
}
