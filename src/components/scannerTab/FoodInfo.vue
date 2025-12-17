<script setup>

import NutrientInfo from "./NutrientInfo.vue";
import MainButton from "../utilities/MainButton.vue";

const emit = defineEmits(['cancel', 'addToTracker']);
const props = defineProps({
  foodObject : {
    scanId : String,
    adrianId : String,
    foodId : String,
    foodName : String,
    foodType : String,
    foodEdible : Boolean,
    nutrients : [
      {
        nutrientId : String,
        type: String,
        amount: Number,
        unit: String
      }
    ],
    scanDateTime : Date,
  }
});

function addToTracker() {
  emit('addToTracker');
  // TODO: send data to server
}

function cancel() {
  emit('cancel', props.foodObject.scanId);
}

</script>

<template>
  <div class="nutrition-grid">
    <div class="top-row">
      <p class="food-name">{{ props.foodObject.foodName }}</p>
      <p v-if="props.foodObject.foodEdible" class="food-info edible">Edible</p>
      <p v-else class="food-info not-edible">Not Edible</p>
    </div>
    <p class="cancel" @click="cancel">X</p>

    <nutrient-info
        v-for="item in props.foodObject.nutrients"
        :nutrient-value="item.amount"
        :nutrient-unit="item.unit"
        :class="item.type.toLowerCase()"
    >
      {{item.type}}
    </nutrient-info>

    <main-button class="add-to-tracker" :black="true" @click="addToTracker">Add To Tracker</main-button>
    <main-button class="scan-again" @click="cancel" >Scan again</main-button>
  </div>
</template>

<style scoped>
.top-row {
  grid-area: food-name;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  gap: 0.5rem;
  align-items: center;
}

.food-name {
  font-weight: 600;
  font-size: 1.2rem;
  margin-left: 0.5rem;
}

.food-info {
  max-width: fit-content;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  margin: 0;
}

.food-info.edible {
  color: var(--main-bg-color);
  background-color: var(--main-green-color);
}
.food-info.not-edible {
  color: var(--main-bg-color);
  background-color: var(--main-red-color);
}

.cancel {
  grid-area: cancel-button;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.cancel:hover{
  cursor: pointer;
  color: var(--secondary-text-color);
}
.calories {
  grid-area: calories;
}
.protein {
  grid-area: protein;
}
.carbs {
  grid-area: carbs;
}
.fat {
  grid-area: fat;
}
.fiber{
  grid-area: fiber;
}
.add-to-tracker {
  grid-area: add-to-tracker;
  width: 100%;
}
.scan-again {
  grid-area: scan-again;
  width: 100%;

}
/* Layout for the grid */
.nutrition-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
  "food-name cancel-button"
  "calories calories"
  "protein carbs"
  "fat fiber"
  "add-to-tracker scan-again";
  border: solid 0.1rem var(--secondary-bg-color);
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
  gap: 1rem;
}

</style>