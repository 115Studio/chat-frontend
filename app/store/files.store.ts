import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'

export interface FileDTO {
  id: string;
  name: string;
  type: string;
  size: number;
  data: File;
  uploading: boolean;
}

export const useFilesStore = defineStore('files', {
  state: () => ({
    files: [] as FileDTO[]
  }),

  actions: {
    addFile(file: Omit<FileDTO, 'uploading'>) {
      if (this.files.length >= 3) {
        toast.error('File limit reached (3 files max)')
        return
      }

      const newFile: FileDTO = {
        ...file,
        uploading: true
      }
      this.files.push(newFile)

      this.uploadFile(newFile)
    },
    removeFile(fileId: string) {
      this.files = this.files.filter(file => file.id !== fileId)
    },
    isUploading(fileId: string): boolean {
      const file = this.files.find(file => file.id === fileId)
      return file ? file.uploading : false
    },
    clearFiles() {
      this.files = []
    },
    uploadFile(file: FileDTO) {
      setTimeout(() => {
        const founded = this.files.find(f => f.id === file.id)
        if (!founded) return
        founded.uploading = false
      }, 4000)
    }
  }
})
