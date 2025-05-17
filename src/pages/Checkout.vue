<script setup lang="ts">
import Footer from '../widgets/Footer.vue';
import FormContainer from '../widgets/FormContainer/FormContainer.vue';
import Header from '../widgets/Header.vue';
</script>

<template>
  <Header />

  <div class="flex flex-col items-center py-9 max-mobile:py-[18px]">
    <FormContainer />

    <Footer />
  </div>
</template>
