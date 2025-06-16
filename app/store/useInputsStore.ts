import { defineStore } from 'pinia'

export enum Inputs {
  SelectedModel = 'selected-model',
  ReasoningLevel = 'model-reasoning',

  ChatInput = 'chat-input',
}

export const useInputsStore = (id: string) =>
  defineStore(`inputs-store-${id}`, {
    state: () => ({
      inputs: new Map<string, any>(),
    }),

    actions: {
      getInput(key: Inputs | string): any | undefined {
        return this.inputs.get(key)
      },

      writeInput(key: Inputs | string, value: any): void {
        this.inputs.set(key, value)
      },

      deleteInput(key: Inputs | string): void {
        this.inputs.delete(key)
      },
    }
  })
