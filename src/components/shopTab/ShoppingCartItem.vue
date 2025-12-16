<script setup>
import {computed, ref} from "vue";

const props = defineProps({
  item: {
    supplementId: String,
    name: String,
    type: String,
    price: Number,
    stock: Number,
    count: Number
  }
});

const emit = defineEmits(['update-amount']);

const dynamicAmount = computed({
  get() {
    return props.item.count;
  },
  set(val) {
      emit('update-amount', {supplementId: props.item.supplementId, newAmount: Number(val)});
    }
});
</script>

<template>
  <div class="cartitem">
    <!-- image -->
    <img :src="props.item.name" :alt="props.item.name" class="image" />

    <div class="info">
      <!-- Title + Price -->
      <div class="top-row">
        <p class="title">{{ props.item.name }}</p>
        <p class="price">€{{ props.item.price }} x <input class="amount" type="number" min="0" v-model="dynamicAmount"></p>
      </div>
      <!-- description -->
      <p class="description">{{ props.item.type }}</p>

    </div>  </div></template>

<style scoped>
.cartitem {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  width: 90%;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--main-bg-color);
  margin-bottom: 1rem;
  border: 1px solid var(--secondary-text-color);
}

.cartitem:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}

.image {
  width: 5rem;
  height: 5rem;
  object-fit: contain;
}

.info {
  flex-grow: 1;
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
  font-size: 1rem;
  font-weight: 600;
  color: var(--main-text-color);
}

.price {
  font-size: 1rem;
  font-weight: 600;
  color: var(--main-green-color);
}

.description {
  font-size: 0.875rem;
  color: var(--secondary-text-color);
}

.price .amount {
  width: 3rem;
  margin-left: 0.5rem;
  padding: 0.25rem;
  border: 0px solid var(--secondary-text-color);
  border-bottom: 1px solid var(--secondary-text-color);
  border-radius: 4px;
  font-size: 1rem;
}

</style>
