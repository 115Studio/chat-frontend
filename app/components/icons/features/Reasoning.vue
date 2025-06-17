<script setup lang="ts">
</script>

<template>
  <TooltipProvider :delay-duration="250">
    <Tooltip>
      <TooltipTrigger>
        <div class="bg-purple-100 rounded-lg p-1.5">
          <BrainHalf class="text-purple-800 h-4 w-4" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <Text as="p" variant="bodySm">
          Can thinking
        </Text>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style scoped lang="scss">

</style>
