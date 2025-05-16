<script setup lang="ts">
import clsx from 'clsx';
import type { Gender } from '../types/userInfo.ts';

const props = defineProps<{
  label: string;
  value: Gender;
  selected: boolean;
}>();

const emit = defineEmits<(e: 'update', value: Gender) => void>();

const handleClick = () => {
  emit('update', props.value);
};
</script>

<template>
  <button
    type="button"
    :class="
      clsx(
        selected
          ? 'bg-radio-button-background text-form-background'
          : 'bg-form-background text-radio-button-text border border-radio-button-border',
        'w-full h-[43px] flex items-center gap-2 rounded-[4px] px-6 cursor-pointer'
      )
    "
    @click="handleClick"
  >
    <span
      :class="
        clsx(
          selected ? 'shadow-[0px_0px_2.63px_0px_#5757575E]' : 'shadow-[0px_0px_2px_0px_#575757D4]',
          'size-[16px] rounded-full bg-form-background flex items-center justify-center'
        )
      "
    >
      <span v-if="selected" class="size-[8px] bg-radio-button-background rounded-full" />
    </span>
    <span class="text-sm font-medium">{{ label }}</span>
  </button>
</template>
