<script setup>
import { ref } from 'vue';
import Checkout from '../pages/Checkout.vue';

const CHECKOUT_ROUTE = '/checkout';
const currentRoute = ref(window.location.pathname);

function goToCheckout() {
  window.location.pathname = CHECKOUT_ROUTE;
}
</script>

<template>
  <div class="font-script bg-main-background h-screen">
    <div v-if="currentRoute === CHECKOUT_ROUTE">
      <Checkout />
    </div>
    <div v-else>
      <p @click="goToCheckout" class="cursor-pointer text-blue-500 underline">
        Go to checkout
      </p>
    </div>
  </div>
</template>
