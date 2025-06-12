import { defineStore } from 'pinia'

export interface FileDTO {
  id: string;
  name: string;
  type: string;
  size: number;
  data: File;
}

export const useFilesStore = defineStore('files', {
  state: () => ({
    files: [] as FileDTO[]
  }),

  actions: {
    addFile(file: FileDTO) {
      this.files.push(file)
    },
    removeFile(fileId: string) {
      this.files = this.files.filter(file => file.id !== fileId)
    },
    clearFiles() {
      this.files = []
    }
  }
})
