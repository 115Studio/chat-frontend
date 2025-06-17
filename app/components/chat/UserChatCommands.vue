<script setup lang="ts">
import { Tooltip } from '@app/components/ui/tooltip'
import { ref } from 'vue'
import type { AiModel } from '@app/constants/ai-model'
const isDropdownOpen = ref(false)

const props = defineProps<{
  copyContent: string
  usedModel?: AiModel
}>()
</script>

<template>
  <div
    class="commands gap-x-2 flex flex-row items-center"
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
