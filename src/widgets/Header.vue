<script setup lang="ts">
import logo from '../shared/assets/logo.svg';
</script>

<template>
  <header
    class="max-mobile:h-[50px] h-[65px] bg-header-background flex justify-center items-center"
  >
    <img :src="logo" alt="app logo" class="h-[27px] w-[144px]" />
  </header>
</template>
