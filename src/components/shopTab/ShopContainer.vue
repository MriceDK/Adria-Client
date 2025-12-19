<script setup>
import ShopItem from "./ShopItem.vue";
import {ref} from "vue";
import {getShopItems} from "@/services/api/shop.js";

const supplements = ref([{
  name: "Not available",
}]);

const props = defineProps(['searchInput']);
const emit = defineEmits(['add-to-cart']);

function handleAddToCart(item) {
  emit("add-to-cart", item);
}

async function getSupplements() {
  supplements.value = await getShopItems();
}
getSupplements();
</script>

<template>
  <div class="shop-container">
    <ShopItem v-for="(item) in supplements" :key="item.supplementId" :item="item" @add-to-cart="handleAddToCart" v-show="item.name.toLowerCase().includes(searchInput.toLowerCase()) || searchInput === ''" />
  </div>
</template>

<style scoped>
.shop-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5%;
}

ShopItem {
  flex: 1 1 calc(33.333% - 1.5rem);
  max-width: calc(33.333% - 1.5rem);
}
</style>
