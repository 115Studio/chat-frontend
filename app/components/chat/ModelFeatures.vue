<script setup lang="ts">
import { Features  } from '@app/constants/models';

import Vision from '@app/components/icons/features/Vision.vue';
import FileScan from '@app/components/icons/features/FileScan.vue';
import Reasoning from '@app/components/icons/features/Reasoning.vue';
import Internet from '@app/components/icons/features/Internet.vue';
import ImageGen from '@app/components/icons/features/ImageGen.vue';

const props = defineProps<{
  features: Features[]
}>();

const map = {
  [Features.Internet]: Internet,
  [Features.Vision]: Vision,
  [Features.PdfScan]: FileScan,
  [Features.Reasoning]: Reasoning,
  [Features.ImageGen]: ImageGen
}
</script>

<template>
  <div class="flex ml-auto pl-4 gap-x-1">
    <component
      :is="map[feature]"
      v-for="feature in props.features"
      :key="feature"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
