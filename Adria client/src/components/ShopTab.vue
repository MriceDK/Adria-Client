<script setup>

import ShopContainer from "@/components/shoptab/ShopContainer.vue";
import ShoppingCart from "@/components/shoptab/ShoppingCart.vue";
import {ref} from "vue";

const cartItems = ref([]);

function handleAddToCart(item) {
  cartItems.value.push(item);
}
</script>

<template>
  <ShoppingCart :cart-items="cartItems" />
  <ShopContainer @add-to-cart="handleAddToCart"/>
</template>

<style scoped>

</style>