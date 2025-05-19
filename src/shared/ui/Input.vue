<script setup lang="ts">
import ErrorContainer from './ErrorContainer.vue';

type InputMode = 'text' | 'email' | 'numeric';

const props = defineProps<{
  value: string;
  errorMessage?: string;
  placeholder?: string;
  inputMode?: {
    type: InputMode;
    default: 'text';
  };
  onBlur?: () => void;
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
      class="flex items-center bg-form-background border-[1.15px] rounded-[4.59px] border-field-border max-mobile:h-[40px] h-[45px] px-[10px] focus-within:outline focus-within:outline focus-within:outline-header-background"
    >
      <slot name="prefix" />
      <input
        class="w-full h-full text-field-value flex-1 outline-none"
        :inputMode="inputMode"
        :value="value"
        :placeholder="placeholder"
        @input="handleInput"
        @blur="onBlur"
      />
      <slot name="suffix" />
    </div>
    <ErrorContainer :errorMessage="errorMessage" />
  </div>
</template>
