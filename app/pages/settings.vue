<script setup lang="ts">
setPageLayout('default')
</script>

<template>
  <div class="container mx-auto">
    <h2 class="text-lg">123123123</h2>
    <Tabs default-value="account" class="w-[400px]">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="personalities">Personalities</TabsTrigger>
        <TabsTrigger value="byok">Byok</TabsTrigger>
      </TabsList>
      <TabsContent value="personalities">
        <h2 class="text-lg">123123123 123 123123 123</h2>
      </TabsContent>
      <TabsContent value="byok">
        <h2 class="text-lg">1231231 12312 3 23</h2>
      </TabsContent>
    </Tabs>
  </div>
</template>

<style scoped lang="scss"></style>
