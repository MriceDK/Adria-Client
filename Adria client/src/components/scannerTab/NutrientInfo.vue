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
  background-color: #f3f3f6;
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
  color: #6b7280; /* gray-500 */
  margin-bottom: 0.25rem;
}

.nutrient-value {

  font-size: 0.9rem;
  font-weight: 600;
  color: #111827; /* gray-900 */
  margin: 0;
}
</style>