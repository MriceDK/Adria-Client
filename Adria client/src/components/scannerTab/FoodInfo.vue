<script setup>

import NutrientInfo from "@/components/scannerTab/NutrientInfo.vue";
import MainButton from "@/components/utilities/MainButton.vue";
</script>

<template>
  <div class="nutrition-grid">
    <p class="food-name">Grilled Chicken breast</p>
    <div class="cancel">
      <svg class="cancel-btn" width="800px" height="800px" viewBox="0 0 512 512">
        <title>cancel</title>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="work-case" fill="#000000" transform="translate(91.520000, 91.520000)">
            <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48">

            </polygon>
          </g>
        </g>
      </svg>
    </div>
    <nutrient-info :nutrient-value="150" nutrient-unit="kcal" class="calories">Calories</nutrient-info>
    <nutrient-info :nutrient-value="150.1" nutrient-unit="g" class="protein">Protein</nutrient-info>
    <nutrient-info :nutrient-value="150" nutrient-unit="g" class="carbs">Carbs</nutrient-info>
    <nutrient-info :nutrient-value="150" nutrient-unit="g" class="fiber">Fiber</nutrient-info>
    <nutrient-info :nutrient-value="150" nutrient-unit="g" class="fat">Fat</nutrient-info>
    <main-button class="add-to-tracker" :black="true">Add To Tracker</main-button>
    <main-button class="scan-again" >Scan again</main-button>
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
  width: 40%;
  gap: 1rem;
}

</style>