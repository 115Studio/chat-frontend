<script setup lang="ts">
const basicSwitch = ref(false)
const disabledSwitch = ref(true)
const smallSwitch = ref(false)
const mediumSwitch = ref(true)
const largeSwitch = ref(false)
const settingsSwitch = ref(false)
const notificationsSwitch = ref(true)

setPageLayout('default')
</script>

<template>
  <div class="min-h-screen bg-background p-8">
    <div class="mx-auto max-w-4xl space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-foreground mb-2">
          Switch Component Demo
        </h1>
        <p class="text-lg text-muted-foreground">
          A beautiful switch component with smooth animations
        </p>
      </div>

      <!-- Basic Usage -->
      <div class="bg-card rounded-lg p-6 border">
        <h2 class="text-2xl font-semibold mb-4 text-card-foreground">
          Basic Usage
        </h2>
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <Switch v-model="basicSwitch" />
            <span class="text-sm">Basic switch: {{ basicSwitch }}</span>
          </div>
          <div class="flex items-center space-x-3">
            <Switch v-model="disabledSwitch" disabled />
            <span class="text-sm text-muted-foreground">Disabled switch</span>
          </div>
        </div>
      </div>

      <!-- Sizes -->
      <div class="bg-card rounded-lg p-6 border">
        <h2 class="text-2xl font-semibold mb-4 text-card-foreground">
          Different Sizes
        </h2>
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <Switch v-model="smallSwitch" size="sm" />
            <span class="text-sm">Small (sm)</span>
          </div>
          <div class="flex items-center space-x-4">
            <Switch v-model="mediumSwitch" size="md" />
            <span class="text-sm">Medium (md) - default</span>
          </div>
          <div class="flex items-center space-x-4">
            <Switch v-model="largeSwitch" size="lg" />
            <span class="text-sm">Large (lg)</span>
          </div>
        </div>
      </div>

      <!-- Real-world Examples -->
      <div class="bg-card rounded-lg p-6 border">
        <h2 class="text-2xl font-semibold mb-4 text-card-foreground">
          Real-world Examples
        </h2>
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium text-card-foreground">Dark Mode</h3>
              <p class="text-sm text-muted-foreground">
                Toggle dark mode for the application
              </p>
            </div>
            <Switch v-model="settingsSwitch" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium text-card-foreground">Push Notifications</h3>
              <p class="text-sm text-muted-foreground">
                Receive notifications for new messages
              </p>
            </div>
            <Switch v-model="notificationsSwitch" />
          </div>
        </div>
      </div>

      <!-- Code Example -->
      <div class="bg-card rounded-lg p-6 border">
        <h2 class="text-2xl font-semibold mb-4 text-card-foreground">
          Usage Example
        </h2>
        <pre class="bg-muted p-4 rounded-md text-sm overflow-x-auto"><code>&lt;script setup&gt;
const isEnabled = ref(false)
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Basic usage --&gt;
  &lt;Switch v-model="isEnabled" /&gt;
  
  &lt;!-- With different sizes --&gt;
  &lt;Switch v-model="isEnabled" size="sm" /&gt;
  &lt;Switch v-model="isEnabled" size="md" /&gt;
  &lt;Switch v-model="isEnabled" size="lg" /&gt;
  
  &lt;!-- Disabled state --&gt;
  &lt;Switch v-model="isEnabled" disabled /&gt;
  
  &lt;!-- With custom classes --&gt;
  &lt;Switch v-model="isEnabled" class="my-custom-class" /&gt;
&lt;/template&gt;</code></pre>
      </div>

      <!-- State Display -->
      <div class="bg-card rounded-lg p-6 border">
        <h2 class="text-2xl font-semibold mb-4 text-card-foreground">
          Current States
        </h2>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>Basic Switch: <code class="bg-muted px-2 py-1 rounded">{{ basicSwitch }}</code></div>
          <div>Disabled Switch: <code class="bg-muted px-2 py-1 rounded">{{ disabledSwitch }}</code></div>
          <div>Small Switch: <code class="bg-muted px-2 py-1 rounded">{{ smallSwitch }}</code></div>
          <div>Medium Switch: <code class="bg-muted px-2 py-1 rounded">{{ mediumSwitch }}</code></div>
          <div>Large Switch: <code class="bg-muted px-2 py-1 rounded">{{ largeSwitch }}</code></div>
          <div>Settings Switch: <code class="bg-muted px-2 py-1 rounded">{{ settingsSwitch }}</code></div>
          <div>Notifications: <code class="bg-muted px-2 py-1 rounded">{{ notificationsSwitch }}</code></div>
        </div>
      </div>
    </div>
  </div>
</template> 