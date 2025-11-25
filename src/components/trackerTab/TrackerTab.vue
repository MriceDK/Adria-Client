<script setup>

import MainButton from "@/components/utilities/MainButton.vue";
import {onMounted, ref} from "vue";
import Statistic from "@/components/statisticsTab/Statistic.vue";
import BarChart from "@/components/trackerTab/charts/BarChart.vue";
import PieChart from "@/components/trackerTab/charts/PieChart.vue";
import RadialBarChart from "@/components/trackerTab/charts/RadialBarChart.vue";

const isEditing = ref(false)
const goals = ref([])
const editableGoals = ref([])

onMounted(() => {
  goals.value = [
    { label: 'Calories', current: 800, goal: 2000, unit: 'kcal' },
    { label: 'Protein', current: 50.7, goal: 150, unit: 'g' },
    { label: 'Carbs', current: 120.9, goal: 250, unit: 'g'  },
    { label: 'Water', current: 2500, goal: 2500, unit: 'ml' }
  ]
  editableGoals.value = goals.value
})

function cancelEdit() {
  editableGoals.value = goals.value
  isEditing.value = false
}

function saveChanges() {
  saveGoals();
}

function saveGoals() {
  goals.value = editableGoals.value
  isEditing.value = false
}
</script>

<template>
  <div class="tracker-component">
    <div class="page-info">
      <div class="page-head">
        <h2>Today's Nutrition</h2>
        <p>Track your daily intake and progress</p>
      </div>
      <main-button v-if="!isEditing" @click="isEditing=true" class="edit-charts">Edit Charts</main-button>
      <div v-else>
        <main-button @click="cancelEdit">Cancel</main-button>
        <main-button @click="saveChanges" :black="true">Save</main-button>
      </div>
    </div>
    <div class="goals-list">
      <statistic
          v-for="item in goals" :key="item.label"
          class="goal-card"
          :class="{ water: item.label === 'Water'}"

          :is-editing="isEditing"
          :item="item"
          :use-progress-bar="true"
      ></statistic>
    </div>
    <div class="goal-charts">
      <pie-chart :goals="goals"/>
      <radial-bar-chart :goals="goals"/>
      <bar-chart :goals="goals"/>
    </div>
  </div>
</template>

<style scoped>
.tracker-component {
  width: 60%;
  margin: 0 auto;
}

.page-info {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  margin: 1.5rem 0;
}

.page-head {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.edit-charts {
  /* Added a class here for an icon later on */
  flex-grow: 0;
  align-self: flex-end;

}

h2 {
  margin: 0;
}

p {
  margin: 0;
}

.goals-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
}

.goal-charts{
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
}
</style>