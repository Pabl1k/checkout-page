<script lang="ts" setup>
defineProps<{
  errorMessage?: string;
}>();
</script>

<template>
  <div class="max-mobile:h-[15px] h-5 pl-[10px]">
    <p v-if="errorMessage" class="max-mobile:text-xs text-sm text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>
