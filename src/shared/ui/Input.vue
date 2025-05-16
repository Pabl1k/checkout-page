<script setup lang="ts">
import ErrorContainer from './ErrorContainer.vue';

const props = defineProps<{
  value: string;
  errorMessage?: string;
  placeholder?: string;
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
      class="flex items-center bg-form-background border-[1.15px] rounded-[4.59px] border-field-border max-mobile:h-[40px] h-[45px] px-[10px]"
    >
      <slot name="prefix" />
      <input
        class="w-full text-field-value flex-1 outline-none"
        :value="value"
        :placeholder="placeholder"
        @input="handleInput"
      />
      <slot name="suffix" />
    </div>
    <ErrorContainer :errorMessage="errorMessage" />
  </div>
</template>
