<script setup lang="ts">
import { PhEye } from '@phosphor-icons/vue'
</script>

<template>
  <TooltipProvider :delay-duration="250">
    <Tooltip>
      <TooltipTrigger>
        <div class="bg-emerald-100 rounded-lg p-1.5">
          <PhEye size="16" weight="bold" class="text-emerald-800" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <Text as="p" variant="bodySm">
          Can see images
        </Text>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style scoped lang="scss">

</style>
