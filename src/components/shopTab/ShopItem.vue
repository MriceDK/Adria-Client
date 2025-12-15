<script setup>
defineProps({
  image: String,
  item: {
    title: String,
    description: String,
    cost: Number
  }
})
const emit = defineEmits(['add-to-cart'])
</script>

<template>
  <div class="shopitem">
    <!-- image -->
    <img src="../../assets/icons/statsicon.png" :alt="item.title" class="image" />

    <div class="info">
      <!-- Title + Price in One Line -->
      <div class="top-row">
        <p class="title">{{ item.title }}</p>
        <p class="price">€{{ item.cost }}</p>
      </div>
      <!-- description -->
      <p class="description">{{ item.description }}</p>

      <!-- button -->
      <button @click="emit('add-to-cart',item)">add to cart</button>
    </div>  </div></template>

<style scoped>
.shopitem {
  border: 1px solid #e0e0e0;
  border-radius: 1rem;
  width: 23%;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.shopitem:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.price {
  font-weight: 700;
  font-size: 1rem;
  color: #2b8a3e;
}

.description {
  color: #555;
}

button {
  margin-top: auto;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #2b8a3e;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #237232;
}
</style>
