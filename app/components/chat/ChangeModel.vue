<script setup lang="ts">
import { models } from '@app/constants/models'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@app/components/ui/dropdown-menu'
import { PhCaretRight } from '@phosphor-icons/vue'
import ModelFeatures from '@app/components/chat/ModelFeatures.vue'
import { defineEmits } from 'vue'
import { AiModelFeature } from '@app/constants/ai-model-feature'
import type { AiModel } from '@app/constants/ai-model'
import { Inputs, useInputsStore } from '@app/store/inputs.store'
import { resolveModelName } from '@app/lib/utils'
import { AiModelFlag } from '@app/constants/ai-model-flag'

const chatId = useRoute().params.id as string

const store = useInputsStore(chatId ?? '@new')()

const props = defineProps<{
  usedModel?: AiModel
  tooltipDisabled?: boolean
}>()

const emit = defineEmits(['dropdown-open'])

function handleOpenChange(open: boolean) {
  emit('dropdown-open', open)
}

const selectModel = (selectedModel: AiModel, level?: AiModelFlag) => {
  store.writeInput(Inputs.SelectedModel, { model: selectedModel })
  store.writeInput(Inputs.ReasoningLevel, { level: typeof level === 'number' ? level : AiModelFlag.None })

  handleOpenChange(false)
}
</script>

<template>
  <DropdownMenu @update:open="handleOpenChange">
    <DropdownMenuTrigger>
      <TooltipProvider :disable-hoverable-content="true" :delay-duration="250">
        <Tooltip>
          <TooltipTrigger>
            <slot/>
          </TooltipTrigger>
          <TooltipContent v-if="!tooltipDisabled">
            <Text as="p" variant="bodySm">
              Change model ({{ resolveModelName(store.getInput(Inputs.SelectedModel)?.model) || 'Select Model' }})
            </Text>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="center" side="bottom" class="w-40">
      <div class="grid gap-1">
        <DropdownMenuSub v-for="model in models" :key="model.name">
          <DropdownMenuSubTrigger class="flex transition-colors items-center">
            <component :is="model.icon" class="w-4 text-accent h-4 mr-2" />
            <Text as="p" variant="bodySm">
              {{ model.name }}
            </Text>
            <div class="ml-auto">
              <PhCaretRight weight="bold" class="ml-auto h-3 w-3" />
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent side="right" class="min-w-40 max-w-96 p-2" :side-offset="15">
            <div class="grid gap-1">
              <template v-for="variant in model.variants" :key="variant.name">
                <ReasoningLevel
                  v-if="variant.features.includes(AiModelFeature.ReasoningControl)"
                  :model="model"
                  :variant="variant"
                  @update:level="(level) => selectModel(variant.id, level as AiModelFlag)"
                />
                <DropdownMenuItem
                  v-else
                  class="cursor-pointer gap-0 items-center"
                  :class="{
                    'bg-accent text-accent-foreground': [props.usedModel, store.getInput(Inputs.SelectedModel)?.model].includes(variant.id),
                  }"
                  @click="selectModel(variant.id)">
                  <component :is="model.icon" class="w-4 text-accent h-4 mr-2" />
                  <Text as="p" variant="bodySm">
                    {{ variant.name }}
                  </Text>
                  <ModelFeatures :features="variant.features" />
                </DropdownMenuItem>
              </template>
            </div>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped lang="scss">
.text-accent {
  color: var(--color-accent);
}

.button {
  @apply p-1.5 rounded-lg transition-colors;
}
</style>
