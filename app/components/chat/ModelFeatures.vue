<script setup lang="ts">
import Vision from '@app/components/icons/features/Vision.vue';
import FileScan from '@app/components/icons/features/FileScan.vue';
import Reasoning from '@app/components/icons/features/Reasoning.vue';
import Internet from '@app/components/icons/features/Internet.vue';
import ImageGen from '@app/components/icons/features/ImageGen.vue';
import { AiModelFeature } from '@app/constants/ai-model-feature'
import { computed } from 'vue';

const props = defineProps<{
  features: AiModelFeature[]
}>();

const map = {
  [AiModelFeature.WebSearch]: Internet,
  [AiModelFeature.Vision]: Vision,
  [AiModelFeature.PdfScan]: FileScan,
  [AiModelFeature.Reasoning]: Reasoning,
  [AiModelFeature.ImageGen]: ImageGen,
}

// Filter out features that don't have icon mappings
const displayableFeatures = computed(() =>
  props.features.filter(feature => map[feature as never])
)
</script>

<template>
  <div class="flex ml-auto pl-4 gap-x-1">
    <component
      :is="map[feature as never]"
      v-for="feature in displayableFeatures"
      :key="feature"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
