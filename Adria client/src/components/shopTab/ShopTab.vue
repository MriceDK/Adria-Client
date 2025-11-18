<script setup>

import ShopContainer from "@/components/shopTab/ShopContainer.vue";
import ShoppingCart from "@/components/shopTab/ShoppingCart.vue";
import {ref} from "vue";



const cartItems = ref([]);



function handleAddToCart(item) {
  let found = false;
  for (let currentItem of cartItems.value) {
    if (currentItem.SupplementId === item.SupplementId) {
      currentItem.count++;
      found = true;
    }
  }
  if (!found) {
      item.count = 1;
      cartItems.value.push(item);
  }
}
</script>

<template>
  <ShoppingCart :cart-items="cartItems" />
  <ShopContainer @add-to-cart="handleAddToCart"/>
</template>

<style scoped>

</style>