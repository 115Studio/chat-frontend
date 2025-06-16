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
import { ReasoningLevelEnum } from '@app/constants/ai-model'

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

const map = {
  [ReasoningLevelEnum.low]: BrainHalf,
  [ReasoningLevelEnum.medium]: BrainHalf,
  [ReasoningLevelEnum.high]: BrainHalf
}

const emit = defineEmits<{
  (e: 'update:level', level: ReasoningLevelEnum): void
}>()
</script>

<template>
  <div>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger class="flex items-start transition-colors">
        <component :is="props.model.icon" class="w-4 text-accent h-4 mr-2" />
        <Text as="p" variant="bodySm">
          {{ props.variant.name }}
        </Text>
        <ModelFeatures :features="variant.features" />
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent side="right" class="w-full p-2" :side-offset="15">
        <DropdownMenuItem
          v-for="level in Object.values(ReasoningLevelEnum)"
          :key="level"
          class="cursor-pointer"
          @click="emit('update:level', level as ReasoningLevelEnum)"
        >
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
