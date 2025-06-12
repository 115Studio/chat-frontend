<script setup lang="ts">
import { Features, models } from '@app/constants/models'
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@app/components/ui/dropdown-menu'
import Retry from '@app/components/icons/Retry.vue'
import { PhCaretRight } from '@phosphor-icons/vue'
import ModelFeatures from '@app/components/chat/ModelFeatures.vue'
import ReasoningLevel from '@app/components/chat/ReasoningLevel.vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['dropdown-open'])

function handleOpenChange(open: boolean) {
  emit('dropdown-open', open)
}
</script>

<template>
  <DropdownMenu @update:open="handleOpenChange">
    <DropdownMenuTrigger>
      <TooltipProvider :delay-duration="250">
        <Tooltip>
          <TooltipTrigger>
            <button class="button">
              <Retry class="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <Text as="p" variant="bodySm">
              Change model (gpt-4o)
            </Text>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="center" side="bottom" class="w-40">
      <div class="grid gap-1">
        <DropdownMenuSub v-for="model in models" :key="model.name">
          <DropdownMenuSubTrigger class="flex transition-colors items-center">
            <component :is="model.icon" class="w-4 text-accent h-4 mr-2" />
            <Text as="p" variant="bodySm">
              {{ model.name }}
            </Text>
            <div class="ml-auto">
              <PhCaretRight weight="bold" class="ml-auto h-3 w-3" />
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent side="right" class="min-w-40 max-w-96 p-2" :side-offset="15">
            <div class="grid gap-1">
              <template v-for="variant in model.variants" :key="variant.name">
                <ReasoningLevel
                  v-if="variant.features.includes(Features.Reasoning)"
                  :model="model"
                  :variant="variant"
                />
                <DropdownMenuItem v-else class="cursor-pointer gap-0 items-center">
                  <component :is="model.icon" class="w-4 text-accent h-4 mr-2" />
                  <Text as="p" variant="bodySm">
                    {{ variant.name }}
                  </Text>
                  <ModelFeatures :features="variant.features" />
                </DropdownMenuItem>
              </template>
            </div>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped lang="scss">
.text-accent {
  color: var(--color-accent);
}

.button {
  @apply p-1.5 rounded-lg hover:bg-gray-300 transition-colors;
}
</style>
