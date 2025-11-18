<script setup>
import ShopItem from './shopItem.vue'
const dummydata = {
  item: {
    title: "banaan",
    description: "een fruit",
    cost: 4.99,
    SupplementId: "1"
  },
  item2: {
    title: "appel",
    description: "een fruit",
    cost: 5.99,
    SupplementId: "2"
  },
  item3: {
    title: "banaan",
    description: "een fruit",
    cost: 1.99,
    SupplementId: "3"
  },
  item4: {
    title: "banaan",
    description: "een fruit",
    cost: 3.65,
    SupplementId: "4"
  },
  item5: {
    title: "banaan",
    description: "een fruit",
    cost: 1.52,
    SupplementId: "5"
  },
  item6: {
    title: "banaan",
    description: "een fruit",
    cost: 0.33,
    SupplementId: "6"
  },
  item7: {
    title: "banaan",
    description: "een fruit",
    cost: 0.14,
    SupplementId: "7"
  }
}
const emit = defineEmits(['add-to-cart'])
function handleAddToCart(item) {
  emit("add-to-cart", item)
}
</script>

<template>
  <div class="shop-container">
    <ShopItem v-for="(item) in dummydata" :item="item" @add-to-cart="handleAddToCart"/>
  </div>
</template>

<style scoped>
  .shop-container {
    display: flex;
    justify-content: space-between;
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