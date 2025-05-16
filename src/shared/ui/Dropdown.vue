<script setup lang="ts">
import { defineProps } from 'vue';
import arrowDown from '../assets/arrowDown.svg';
import arrowUp from '../assets/arrowUp.svg';

defineProps<{
  value: string;
  options: string[];
  placeholder: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="flex flex-col relative">
    <select
      class="text-field-value appearance-none bg-form-background border-[1.15px] rounded-[4.59px] border-field-border h-[45px] px-[10px] pr-[36px] text-black"
      :value="value"
      @change="handleChange"
    >
      <option disabled hidden value="" class="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    <div
      class="flex flex-col gap-1 absolute right-[12px] top-1/2 transform -translate-y-1/2 pointer-events-none"
    >
      <img :src="arrowUp" alt="arrow up" class="w-[6px] h-[5.63px]" />
      <img :src="arrowDown" alt="arrow down" class="w-[6px] h-[5.63px]" />
    </div>
  </div>
</template>
