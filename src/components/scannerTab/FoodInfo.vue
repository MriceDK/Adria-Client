<script setup>

import NutrientInfo from "@/components/scannerTab/NutrientInfo.vue";
import MainButton from "@/components/utilities/MainButton.vue";

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
  emit('cancel');
}

</script>

<template>
  <div class="nutrition-grid">
    <p class="food-name">{{ props.foodObject.foodName }}</p>
    <div class="cancel" @click="cancel">
      <img src="../../assets/icons/cross-icon.svg" class="cancel-btn" alt="Cancel" />
    </div>
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
.food-name {
  grid-area: food-name;
  font-weight: 600;
}
.cancel {
  grid-area: cancel-button;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.cancel-btn{
  height: 30%;
  width: 30%;
}
.cancel-btn:hover{
  filter: invert(32%) sepia(0%) saturate(809%) hue-rotate(218deg) brightness(98%) contrast(92%);
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