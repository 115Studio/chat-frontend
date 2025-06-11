<template>
  <div class="container py-10">
    <div class="grid gap-8">
      <!-- Original Tooltip Example -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Original Tooltip in Popover (Fixed)</h2>
        <Popover>
          <PopoverTrigger class="px-4 py-2 bg-black text-white rounded-md">
            Open popover
          </PopoverTrigger>
          <PopoverContent align="center" side="top" class="w-80">
            <TooltipProvider>
              <Tooltip :default-open="false" :ignore-non-keyboard-focus="true">
                <TooltipTrigger class="px-4 py-2 bg-black text-white rounded-md">
                  Наведите на меня
                </TooltipTrigger>
                <TooltipContent side="left" class="w-64">
                  <TooltipProvider side="left">
                    <Tooltip :ignore-non-keyboard-focus="true">
                      <TooltipTrigger class="px-4 py-2 bg-black text-white rounded-md">
                        Наведите на меня 2
                      </TooltipTrigger>
                      <TooltipContent class="w-64">
                        <p>Это базовый тултип 3</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </PopoverContent>
        </Popover>
      </section>

      <!-- Keyboard Menu Examples -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Keyboard-Navigable Menus</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- AI Model Selector -->
          <div>
            <h3 class="text-lg font-medium mb-2">AI Model Selector</h3>
            <p class="text-sm text-gray-600 mb-4">Use ↑↓ arrows, Enter to select, Esc to close</p>
            <KeyboardMenu
              v-model="selectedModel"
              :items="modelItems"
              placeholder="Select AI Model..."
              @select="onModelSelect"
            />
          </div>

          <!-- Quality Settings -->
          <div>
            <h3 class="text-lg font-medium mb-2">Quality Settings</h3>
            <p class="text-sm text-gray-600 mb-4">Keyboard navigable with tooltips on hover</p>
            <KeyboardMenu
              v-model="selectedQuality"
              :items="qualityItems"
              placeholder="Select Quality..."
              @select="onQualitySelect"
            />
          </div>
        </div>

        <!-- Selected Values Display -->
        <div class="mt-6 p-4 bg-gray-100 rounded-md">
          <h4 class="font-medium mb-2">Selected Values:</h4>
          <p><strong>Model:</strong> {{ selectedModel || 'None' }}</p>
          <p><strong>Quality:</strong> {{ selectedQuality || 'None' }}</p>
        </div>
      </section>

      <!-- Usage Instructions -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Keyboard Controls</h2>
        <div class="bg-blue-50 p-4 rounded-md">
          <ul class="space-y-2 text-sm">
            <li><kbd class="px-2 py-1 bg-gray-200 rounded text-xs">Space</kbd> or <kbd class="px-2 py-1 bg-gray-200 rounded text-xs">Enter</kbd> - Open menu</li>
            <li><kbd class="px-2 py-1 bg-gray-200 rounded text-xs">↑</kbd> <kbd class="px-2 py-1 bg-gray-200 rounded text-xs">↓</kbd> - Navigate options</li>
            <li><kbd class="px-2 py-1 bg-gray-200 rounded text-xs">Enter</kbd> - Select option</li>
            <li><kbd class="px-2 py-1 bg-gray-200 rounded text-xs">Esc</kbd> - Close menu</li>
            <li><kbd class="px-2 py-1 bg-gray-200 rounded text-xs">Tab</kbd> - Close menu and move to next element</li>
            <li><strong>Mouse hover</strong> - Show tooltips (no focus conflicts!)</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@app/components/ui/tooltip'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@app/components/ui/popover'

import KeyboardMenu from '@app/components/ui/KeyboardMenu.vue'

const selectedModel = ref('')
const selectedQuality = ref('medium')

const modelItems = [
  {
    id: 'gemini-flash',
    label: 'Gemini 2.5 Flash',
    tooltip: 'Fast and efficient model for quick responses',
    action: () => console.log('Gemini Flash selected')
  },
  {
    id: 'claude-3.5-sonnet',
    label: 'Claude 3.5 Sonnet',
    tooltip: 'Advanced reasoning with excellent coding capabilities'
  },
  {
    id: 'claude-3.7-sonnet',
    label: 'Claude 3.7 Sonnet',
    tooltip: 'Latest version with improved performance'
  },
  {
    id: 'claude-3.7-reasoning',
    label: 'Claude 3.7 Sonnet (Reasoning)',
    tooltip: 'Specialized for complex reasoning tasks'
  },
  {
    id: 'claude-4-sonnet',
    label: 'Claude 4 Sonnet',
    tooltip: 'Next generation model (preview)'
  },
  {
    id: 'claude-4-reasoning',
    label: 'Claude 4 Sonnet (Reasoning)',
    tooltip: 'Advanced reasoning version of Claude 4'
  },
  {
    id: 'gpt-4',
    label: 'GPT-4',
    tooltip: 'OpenAI\'s flagship model',
    disabled: true
  }
]

const qualityItems = [
  {
    id: 'high',
    label: 'High',
    tooltip: 'Best quality, slower response time'
  },
  {
    id: 'medium',
    label: 'Medium (Default)',
    tooltip: 'Balanced quality and speed'
  },
  {
    id: 'low',
    label: 'Low',
    tooltip: 'Faster responses, lower quality'
  }
]

function onModelSelect(item: any) {
  console.log('Model selected:', item)
}

function onQualitySelect(item: any) {
  console.log('Quality selected:', item)
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

kbd {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
}
</style>
