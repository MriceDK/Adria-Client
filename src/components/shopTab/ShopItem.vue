<script setup>
import {ref} from "vue";

const props = defineProps({
  item : {
    name : String,
    price: Number,
    stock: Number,
    supplementId: String,
    type: String,
  }
})
const emit = defineEmits(['add-to-cart']);
const fixedSource =  ref("./assets/images/" + props.item.name.toLowerCase().replaceAll(' ', '') + ".png");

function handleAddToCart() {
  emit('add-to-cart', props.item);
}
</script>

<template>
  <div class="shopitem">
    <!-- image -->
    <img :src="fixedSource" :alt="props.item.name.toLowerCase().replaceAll(' ', '')" class="image" />


    <div class="info">
      <!-- Title + Price in One Line -->
      <div class="top-row">
        <p class="title">{{ props.item.name }}</p>
        <p class="price">€{{ props.item.price }}</p>
      </div>
      <!-- description -->
      <p class="description">{{ props.item.type }}</p>

      <!-- button -->
      <button @click="handleAddToCart">add to cart</button>
    </div>  </div></template>

<style scoped>
.shopitem {
  border: 1px solid var(--secondary-bg-color);
  border-radius: 1rem;
  width: 23%;
  overflow: hidden;
  background: var(--main-bg-color);
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
  border-bottom: 1px solid var(--main-bg-color);
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
  color: var(--main-text-color);
}

.price {
  font-weight: 700;
  font-size: 1rem;
  color: var(--main-green-color);
}

.description {
  color: var(--hover-black-color);
}

button {
  margin-top: auto;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--secondary-green-color);
  color: var(--main-bg-color);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: var(--main-green-color);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(43, 138, 62, 0.5);
}

button:active {
  background-color: var(--main-text-color);
  transform: scale(0.97);
}
</style>
