import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import type { Upload } from '@app/types'
import { fileExists, uploadFile } from '@app/composables/api'
import { useAuthStore } from '@app/store/auth.store'
import { sha1, stringToArrayBuffer } from '@app/lib/utils'
import { wait } from '@app/composables/wait'

export interface StoreFile {
  isUploading: boolean
  url: string
  id?: string
  internalId: string

  raw?: File
  name: string
  type: string
}

export const useFilesStore = (id: string) =>
  defineStore(`files-channel-${id}`, {
    state: () => ({
      files: [] as Array<StoreFile>,
    }),

    persist: {
      storage: localStorage
    },

    actions: {
      async addFile(file: File) {
        if (file.size >= 8 * 1024 * 1024) {
          toast.error('File size exceeds 8MB limit.')
          return
        }

        if (this.files.length >= 3) {
          toast.error('You can only upload up to 3 files at a time.')
          return
        }

        const internalId = await sha1(stringToArrayBuffer(file.name + Date.now()))

        this.files.push({
          url: URL.createObjectURL(file),
          isUploading: true,
          internalId,

          raw: file,
          type: file.type,
          name: file.name,
        })

        this.uploadFile(internalId).then(() => {})
      },

      async addExisting(file: Omit<StoreFile, 'internalId' | 'isUploading'>) {
        const internalId = await sha1(stringToArrayBuffer(file.name + Date.now()))

        this.files.push({
          ...file,
          internalId,
          isUploading: false,
        })
      },

      removeFile(fileId: string) {
        this.files = this.files.filter((file) => file.id !== fileId && file.internalId !== fileId)
      },

      isUploading(fileId: string): boolean {
        const file = this.files.find((file) => file.internalId === fileId)
        return !!file?.isUploading
      },

      canSend(): boolean {
        return this.files.every((f) => !!f.id)
      },

      clearFiles() {
        this.files = []
      },

      async uploadFile(internalId: string): Promise<Upload> {
        const file = this.files.find((f) => f.internalId === internalId)
        if (!file) return Promise.reject(new Error('File not found'))

        if (!file.raw) return Promise.reject(new Error('File raw data not available'))

        const hash = await sha1(await file.raw.arrayBuffer())

        const isFileExist = await fileExists(
          useAuthStore().jwt,
          hash,
        )

        console.log('Checking if file exists:', isFileExist, isFileExist.ok)

        if (isFileExist.ok) {
          const data = isFileExist.result as Upload
          file.id = data.id
          file.url = data.url
          file.isUploading = false

          console.log('File already exists:', data)

          return data
        }

        try {
          await wait(1000)
          const uploaded = await uploadFile(useAuthStore().jwt, file.raw)

          if (!uploaded.ok) {
            this.removeFile(file.internalId)

            for (const error of uploaded.errors) {
              toast.error(error.message)
            }

            return Promise.reject(new Error('File upload failed'))
          }

          const data = uploaded.result

          file.url = data.url
          file.id = data.id
          file.isUploading = false

          return data
        } catch (e) {
          console.log('File upload error:', e)

          this.removeFile(file.internalId)

          toast.error('File upload failed')
          return Promise.reject(new Error('File upload failed'))
        }
      },

      async checkStore() {
        for (const file of this.files) {
          if (file.isUploading && file.raw?.arrayBuffer)
            this.uploadFile(file.internalId).catch(() => {})
          else if (!file.url && file.raw?.arrayBuffer)
            file.url = URL.createObjectURL(file.raw)
          else
            this.removeFile(file.internalId)
        }
      }
    },
  })
