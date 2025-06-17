import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { MessageStageType } from '@app/constants/message-stage-type'
import { MessageStageContentType } from '@app/constants/message-stage-content-type'
import type { MessageStages } from '@app/types'
import type { AiModel } from '@app/constants/ai-model'
import { models } from '@app/constants/models'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function' ? updaterOrValue(ref.value) : updaterOrValue
}

export const normalizeAbsoluteLeaves = (el: HTMLElement | any) => {
  const { marginLeft, marginTop, width, height } = window.getComputedStyle(el)

  el.style.left = `${el.offsetLeft - parseFloat(marginLeft)}px`
  el.style.top = `${el.offsetTop - parseFloat(marginTop)}px`
  el.style.width = width
  el.style.height = height
}

export const sha1 = async (input: ArrayBuffer) => {
  const hashBuffer = await crypto.subtle.digest('SHA-1', input)
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export const stringToArrayBuffer = (str: string): ArrayBuffer => {
  return new TextEncoder().encode(str).buffer as ArrayBuffer
}

export const resolveMessageStageType = (type: string): MessageStageType => {
  if (type.startsWith('image')) return MessageStageType.Vision
  if (type.startsWith('application/pdf')) return MessageStageType.Pdf
  if (type.startsWith('application')) return MessageStageType.File
  if (type.startsWith('text')) return MessageStageType.File
  else return MessageStageType.Text
}

export const resolveMessageStageContentType = (type: string): MessageStageContentType => {
  if (type.startsWith('image')) return MessageStageContentType.Vision
  if (type.startsWith('application')) return MessageStageContentType.File
  if (type.startsWith('text')) return MessageStageContentType.File
  else return MessageStageContentType.Text
}

export const convertStorageToAiRequest = (stages: MessageStages) => {
  return stages.map((stage) => {
    if (stage.type === MessageStageType.Vision)
      if (stage.content!.type === MessageStageContentType.Vision) {
        const [id] = stage.content!.value!.split('::') ?? []
        return {
          type: stage.type,
          content: {
            type: stage.content!.type,
            value: id ?? stage.content!.value,
          },
        }
      }

    return stage
  })
}

export const resolveModelName = (model: AiModel): string => {
  return models.flatMap((m) => m.variants).find(variant => variant.id === model)?.name ?? model
}

export const resolveModelIcon = (model: AiModel) => {
  return models.find(m => m.variants.some(variant => variant.id === model))?.icon ?? ''
}
