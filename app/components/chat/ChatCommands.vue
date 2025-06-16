<script setup lang="ts">
import ChangeModel from '@app/components/chat/ChangeModel.vue'
import { Tooltip } from '@app/components/ui/tooltip'
import { ref, computed } from 'vue'
import type { AiModel } from '@app/constants/ai-model'

const isDropdownOpen = ref(false)

const props = defineProps<{
  copyContent: string
}>()

const model = defineModel<AiModel>()

const isActive = computed(() => isDropdownOpen.value)
</script>

<template>
  <div
    class="my-1 commands gap-x-2 flex flex-row items-center"
    :class="{ 'commands--active': isDropdownOpen }"
  >
    <TooltipProvider :delay-duration="250">
      <Tooltip>
        <TooltipTrigger>
          <CopyButton :value="props.copyContent" />
        </TooltipTrigger>
        <TooltipContent>
          <Text as="p" variant="bodySm">
            Copy
          </Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <!--TooltipProvider :delay-duration="250">
      <Tooltip>
        <TooltipTrigger>
          <button class="button">
            <Split class="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <Text as="p" variant="bodySm">
            Branch Off
          </Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider-->
    <ChangeModel v-model="model" @dropdown-open="val => isDropdownOpen = val" />
  </div>
</template>

<style scoped lang="scss">
.button {
  @apply p-1.5 rounded-lg transition-all;
}

.commands {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.commands--active {
  opacity: 1 !important;
}
</style>
