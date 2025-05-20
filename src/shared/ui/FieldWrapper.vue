<script setup lang="ts">
import clsx from 'clsx';

defineProps<{
  labelId: string;
  title: string;
  smallText?: boolean;
}>();
</script>

<template>
  <div class="flex flex-col">
    <label
      :for="labelId"
      :class="
        clsx(
          smallText && 'max-mobile:text-[14.75px]',
          'text-field-name font-bold leading-[1.5] mb-1'
        )
      "
    >
      {{ title }}
    </label>
    <div>
      <slot />
    </div>
  </div>
</template>
