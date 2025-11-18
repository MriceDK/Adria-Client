<script setup>
import ShopContainer from "@/components/shoptab/ShopContainer.vue";
import ShoppingCart from "@/components/shoptab/ShoppingCart.vue";
import {ref} from "vue";
import SearchBar from "@/components/utilities/SearchBar.vue";
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
  <search-bar></search-bar>
  <ShopContainer @add-to-cart="handleAddToCart"/>
</template>

<style scoped>

</style>