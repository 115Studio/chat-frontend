import { defineStore } from 'pinia'

export enum Inputs {
  SelectedModel = 'selected-model',
  ReasoningLevel = 'model-reasoning',

  ChatInput = 'chat-input',
}

export const useInputsStore = (id: string) =>
  defineStore(`inputs-store-${id}`, {
    state: () => ({
      inputs: {} as Record<Inputs | string, any>,
    }),

    persist: {
      storage: localStorage,
    },

    actions: {
      getInput(key: Inputs | string): any | undefined {
        return this.inputs[key]
      },

      writeInput(key: Inputs | string, value: any): void {
        this.inputs[key] = value
      },

      deleteInput(key: Inputs | string): void {
        this.inputs.delete[key] = undefined
      },
    }
  })
