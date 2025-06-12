<script setup lang="ts">
import Copy from '@app/components/icons/Copy.vue'
import Split from '@app/components/icons/Split.vue'
import ChangeModel from '@app/components/chat/ChangeModel.vue'
import { Tooltip } from '@app/components/ui/tooltip'
import { ref, computed } from 'vue'

const isDropdownOpen = ref(false)

const isActive = computed(() => isDropdownOpen.value)
</script>

<template>
  <div
    class="my-1 commands flex gap-x-2"
    :class="{ 'commands--active': isDropdownOpen }"
  >
    <TooltipProvider :delay-duration="250">
      <Tooltip>
        <TooltipTrigger>
          <button class="button">
            <Copy class="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <Text as="p" variant="bodySm">
            Copy
          </Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <TooltipProvider :delay-duration="250">
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
    </TooltipProvider>
    <ChangeModel @dropdown-open="val => isDropdownOpen = val" />
  </div>
</template>

<style scoped lang="scss">
.button {
  @apply p-1.5 rounded-lg hover:bg-gray-300 transition-colors;
}
.commands {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.commands--active {
  opacity: 1 !important;
}
</style>
