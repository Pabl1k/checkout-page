<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  value: string;
  errorMessage?: string;
  onChange: (value: string) => void;
}>();

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  props.onChange(target.value);
}
</script>

<template>
  <div class="flex flex-col">
    <div
      class="flex items-center bg-form-background border-[1.15px] rounded-[4.59px] border-field-border h-[45px] px-[10px]"
    >
      <slot name="prefix" />
      <input
        class="text-field-value flex-1 bg-transparent outline-none"
        :value="value"
        @input="handleInput"
      />
    </div>
    <div class="h-[20px]">
      <p v-if="errorMessage" class="text-red-500 text-sm">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
