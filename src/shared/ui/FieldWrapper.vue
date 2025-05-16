<script setup lang="ts">
import clsx from 'clsx';

defineProps<{
  title: string;
  smallText?: boolean;
}>();
</script>

<template>
  <div class="flex flex-col">
    <h2
      :class="
        clsx(
          smallText && 'max-mobile:text-[14.75px]',
          'text-field-name font-bold leading-[1.5] mb-1'
        )
      "
    >
      {{ title }}
    </h2>
    <div>
      <slot />
    </div>
  </div>
</template>
