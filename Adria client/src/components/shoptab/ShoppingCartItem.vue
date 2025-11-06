<script setup>
defineProps({
  image: String,
  item: {
    title: String,
    description: String,
    cost: Number
  }
})
</script>

<template>
  <div class="cartitem">
    <!-- image -->
    <img :src="image" :alt="item.title" class="image" />

    <div class="info">
      <!-- Title + Price -->
      <div class="top-row">
        <p class="title">{{ item.title }}</p>
        <p class="price">€{{ item.cost }}</p>
      </div>

      <!-- description -->
      <p class="description">{{ item.description }}</p>

    </div>
  </div>
</template>

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
  width: 80px;
  height: 80px;
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

</style>
