<script setup lang="ts">
const items = ['about us', 'privacy policy', 'terms of use'];
</script>

<template>
  <footer
    class="max-mobile:w-[289px] w-[297px] font-script-footer mt-[47px] max-mobile:mt-[11px] flex flex-col items-center justify-center gap-5"
  >
    <div class="w-full flex justify-between">
      <div
        v-for="item in items"
        :key="item"
        class="text-sm text-footer-text leading-none capitalize"
      >
        {{ item }}
      </div>
    </div>

    <span class="text-xs text-footer-text leading-none">©2023 All Rights Reserved.</span>
  </footer>
</template>
