<script lang="ts" setup>
import clsx from 'clsx';

defineProps<{
  errorMessage?: string;
  cardSection?: boolean;
}>();
</script>

<template>
  <div :class="clsx(cardSection ? 'max-mobile:h-[14px]' : 'max-mobile:h-[15px]', 'h-5 pl-[10px]')">
    <p v-if="errorMessage" class="max-mobile:text-xs text-sm text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>
