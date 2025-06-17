<script setup lang="ts">
import { PhFileText } from '@phosphor-icons/vue'
import { Tooltip } from '@app/components/ui/tooltip'
</script>

<template>
  <TooltipProvider :delay-duration="250">
    <Tooltip>
      <TooltipTrigger>
        <div class="bg-indigo-100 rounded-lg p-1.5">
          <PhFileText size="16" weight="bold" class="text-indigo-800" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <Text as="p" variant="bodySm">
          Can analyze files
        </Text>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style scoped lang="scss">

</style>
