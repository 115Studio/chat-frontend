<script setup lang="ts">
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@app/components/ui/dropdown-menu'
import ModelFeatures from '@app/components/chat/ModelFeatures.vue'

import BrainHalf from '@app/components/icons/BrainHalf.vue';
import type { AiModelFeature } from '@app/constants/ai-model-feature'

const props = defineProps<{
  model: {
    icon: any,
    name: string,
    variants: Array<{
      name: string,
      features: AiModelFeature[]
    }>
  },
  variant: {
    name: string,
    features: AiModelFeature[]
  }
}>();

enum ReasoningLevel {
  high = 'High',
  medium = 'Medium',
  low = 'Low'
}

const map = {
  [ReasoningLevel.low]: BrainHalf,
  [ReasoningLevel.medium]: BrainHalf,
  [ReasoningLevel.high]: BrainHalf
}
</script>

<template>
  <div>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger class="flex items-start transition-colors items-center">
        <component :is="props.model.icon" class="w-4 text-accent h-4 mr-2" />
        <Text as="p" variant="bodySm">
          {{ props.variant.name }}
        </Text>
        <ModelFeatures :features="variant.features" />
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent side="right" class="w-full p-2" :side-offset="15">
        <DropdownMenuItem
          v-for="level in Object.values(ReasoningLevel)"
          :key="level"
          class="cursor-pointer">
          <component :is="map[level]" class="w-4 h-4" />
          <Text as="p" variant="bodySm">
            {{ level }}
          </Text>
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </div>
</template>

<style scoped lang="scss">
.text-accent {
  color: var(--color-accent);
}
</style>
