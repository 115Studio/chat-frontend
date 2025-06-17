<script setup lang="ts">
import { Tooltip } from '@app/components/ui/tooltip'
</script>

<template>
  <TooltipProvider :delay-duration="250">
    <Tooltip>
      <TooltipTrigger>
        <div class="bg-orange-100 rounded-lg p-1.5">
          <ImagePlus class="w-4 h-4 text-orange-800" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <Text as="p" variant="bodySm">
          Can generate images
        </Text>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style scoped lang="scss">

</style>
