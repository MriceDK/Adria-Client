<script setup>
const props = defineProps({
  nutrientValue: Number,
  nutrientUnit: String,
});
</script>

<template>
  <div class="nutrient-container">
    <label class="nutrient-label"><slot></slot></label>
    <p class="nutrient-value">{{props.nutrientValue}} {{props.nutrientUnit}}</p>
  </div>
</template>

<style scoped>
.nutrient-container {
  background-color: var(--main-bg-color);
  border-radius: 0.65rem;
  padding: 1rem 1.25rem;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.nutrient-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--secondary-text-color);
  margin-bottom: 0.25rem;
}

.nutrient-value {

  font-size: 0.9rem;
  font-weight: 600;
  color: var(--main-text-color);
  margin: 0;
}
</style>