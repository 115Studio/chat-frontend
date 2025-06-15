<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@app/components/ui/form'

import Button from '@app/components/global/Button.vue'

setPageLayout('default')

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    prompt: z.string().min(1).max(1000).optional(),
  }),
)

function onSubmit(values: any) {
  console.log('Form submitted with values:', values)
}
</script>

<template>
  <div>
    <h2 class="text-xl">Personality demo</h2>
    <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
      <Dialog>
        <DialogTrigger as-child>
          <Button>Create Personality</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle>Create Personality</DialogTitle>
          </DialogHeader>

          <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Coder" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="prompt">
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="I'd like you to make me all code"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </form>

          <DialogFooter>
            <Button type="submit" form="dialogForm"> Save changes </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  </div>
</template>

<style scoped lang="scss"></style>
