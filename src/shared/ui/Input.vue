<script setup lang="ts">
import clsx from 'clsx';
import ErrorContainer from './ErrorContainer.vue';

type InputMode = 'text' | 'email' | 'numeric';

const props = withDefaults(
  defineProps<{
    id: string;
    value: string;
    errorMessage?: string;
    placeholder?: string;
    inputMode?: InputMode;
    cardSection?: boolean;
    onBlur?: () => void;
    onChange: (value: string) => void;
  }>(),
  {
    inputMode: 'text',
    cardSection: false
  }
);

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  props.onChange(target.value);
}
</script>

<template>
  <div class="flex flex-col">
    <div
      :class="
        clsx(
          cardSection ? 'border-[1.06px] rounded-[4.23px]' : 'border-[1.15px] rounded-[4.59px]',
          'flex items-center bg-form-background border-field-border max-mobile:h-[40px] h-[45px] px-[10px] focus-within:outline focus-within:outline focus-within:outline-header-background'
        )
      "
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
    <ErrorContainer :error-message="errorMessage" :card-section="cardSection" />
  </div>
</template>
