<script setup>
import ShopContainer from "@/components/shoptab/ShopContainer.vue";
import ShoppingCart from "@/components/shoptab/ShoppingCart.vue";
import {ref} from "vue";
import SearchBar from "@/components/utilities/SearchBar.vue";
const cartItems = ref([]);
const searchValue = ref("");

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
function handleSearch(input) {
  searchValue.value = input;
}
</script>

<template>
  <ShoppingCart :cart-items="cartItems" />
  <search-bar @search-enter="handleSearch" />
  <ShopContainer @add-to-cart="handleAddToCart" :search-input="searchValue" />
</template>

<style scoped>

</style>