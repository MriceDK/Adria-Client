<script setup>
import {ref} from "vue";

const props = defineProps({
  image: String,
  item: {
    SupplementId: String,
    title: String,
    description: String,
    cost: Number,
    count: Number
  }
});

const emit = defineEmits(['update-amount']);

const dynamicAmount = ref(props.item.count);

function updateAmount() {
  emit('update-amount', {SupplementId: props.item.SupplementId, newAmount: dynamicAmount.value});
  dynamicAmount.value = props.item.count;
}

</script>

<template>
  <div class="cartitem">
    <!-- image -->
    <img :src="image" :alt="props.item.title" class="image" />

    <div class="info">
      <!-- Title + Price -->
      <div class="top-row">
        <p class="title">{{ props.item.title }}</p>
        <p class="price">€{{ props.item.cost }} x <input class="amount" type="number" min="0" v-model="dynamicAmount" @change="updateAmount"></p>
      </div>
      <!-- description -->
      <p class="description">{{ props.item.description }}</p>

    </div>  </div></template>

<style scoped>
.cartitem {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  width: 90%;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 1rem;
  border: 1px solid lightgray;
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
  color: #111827;
}

.price {
  font-size: 1rem;
  font-weight: 600;
  color: #16a34a;
}

.description {
  font-size: 0.875rem;
  color: #6b7280;
}

.price .amount {
  width: 3rem;
  margin-left: 0.5rem;
  padding: 0.25rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}

</style>
