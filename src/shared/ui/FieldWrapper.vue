<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <h2 class="text-field-name font-bold leading-[1.5] mb-1">{{ title }}</h2>
  <div>
    <slot />
  </div>
</template>
