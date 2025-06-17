<script setup lang="ts">

import { PhGlobe } from '@phosphor-icons/vue'
</script>

<template>
  <TooltipProvider :delay-duration="250">
    <Tooltip>
      <TooltipTrigger>
        <div class="bg-blue-100 rounded-lg p-1.5">
          <PhGlobe size="16" weight="bold" class="text-blue-800" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <Text as="p" variant="bodySm">
          Can search the internet
        </Text>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style scoped lang="scss">

</style>
