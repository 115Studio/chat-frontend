import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import type { Upload } from '@app/types'

export interface PendingFile {
  id: string
  sha: string
  file: File
}

export const useFilesStore = (id: string) => defineStore(`files-channel-${id}`, {
  state: () => ({
    files: [] as Array<PendingFile | Upload>
  }),

  actions: {
    addFile(file: File, sha: string) {
      if ((this.files.length + this.pendingFiles.length) >= 3) {
        toast.error('File limit reached (3 files max)')
        return
      }

      this.files.push({
        file,
        sha,
      })
    },

    removeFile(fileId: string) {
      this.files = this.files.filter(file => file.id !== fileId)
    },

    isUploading(fileId: string): boolean {
      const file = this.files.find(file => file.id === fileId)
      return !!file?.url
    },

    canSend(): boolean {
      return this.files.every(f => !!file.url)
    },

    clearFiles() {
      this.files = []
    },
  }
})
