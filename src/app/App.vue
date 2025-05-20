<script setup>
import { ref } from 'vue';
import Checkout from '../pages/Checkout.vue';

const CHECKOUT_ROUTE = '#/checkout';
const currentRoute = ref(window.location.hash || '#/');

window.addEventListener('hashchange', () => {
  currentRoute.value = window.location.hash || '#/';
});

function goToCheckout() {
  window.location.hash = CHECKOUT_ROUTE;
}
</script>

<template>
  <div class="font-script bg-main-background min-h-screen">
    <div v-if="currentRoute === CHECKOUT_ROUTE">
      <Checkout />
    </div>
    <div v-else class="h-screen">
      <p @click="goToCheckout" class="cursor-pointer text-blue-500 underline">Go to checkout</p>
    </div>
  </div>
</template>
