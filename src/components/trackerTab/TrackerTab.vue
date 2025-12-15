<script setup>
import {onMounted, ref} from "vue";
import MainButton from "@/components/utilities/MainButton.vue";
import Statistic from "@/components/statisticsTab/Statistic.vue";
import BarChart from "@/components/trackerTab/charts/BarChart.vue";
import PieChart from "@/components/trackerTab/charts/PieChart.vue";
import RadialBarChart from "@/components/trackerTab/charts/RadialBarChart.vue";
import LineChart from "@/components/trackerTab/charts/LineChart.vue";
import LineChartCalories from "@/components/trackerTab/charts/LineChartCalories.vue";
import {useStats} from "@/composables/useStats.js";
import {updateStatGoal} from "@/services/statsService.js";

const isEditing = ref(false);
const goals = ref([]);
const editableGoals = ref([]);

onMounted(async () => {
  goals.value = await useStats("tracker-data");
  editableGoals.value = JSON.parse(JSON.stringify(goals.value));
});

function cancelEdit() {
  editableGoals.value = JSON.parse(JSON.stringify(goals.value));
  isEditing.value = false;
}

async function saveChanges() {
  for (const stat of editableGoals.value) {
    await updateStatGoal(stat.bodyStatId, stat.goal);
  }

  goals.value = JSON.parse(JSON.stringify(editableGoals.value));
  isEditing.value = false;
}
</script>

<template>
  <section>
    <main class="tracker-main">
      <div class="tracker-component">

        <div class="header-row">
          <div class="page-head">
            <h1>Today's Nutrition</h1>
            <p>Track your daily intake and progress</p>
          </div>

          <div class="actions">
            <MainButton
                v-if="!isEditing"
                @click="isEditing = true"
            >
              Edit Charts
            </MainButton>

            <div v-else class="edit-buttons">
              <MainButton @click="cancelEdit">Cancel</MainButton>
              <MainButton @click="saveChanges" :black="true">Save</MainButton>
            </div>
          </div>
        </div>

        <div class="goals-list">
          <Statistic
              v-for="item in goals"
              :key="item.label"
              class="goal-card"
              :class="{ water: item.label === 'Water' }"
              :is-editing="isEditing"
              :item="item"
              :use-progress-bar="true"
          />
        </div>

        <div class="goal-charts">
          <PieChart :goals="goals" :is-editing="isEditing" />
          <RadialBarChart :goals="goals" :is-editing="isEditing" />
          <BarChart :goals="goals" :is-editing="isEditing" />
        </div>

        <div class="info-charts">
          <LineChartCalories :is-editing="isEditing" />
          <LineChart :is-editing="isEditing" />
        </div>

      </div>
    </main>
  </section>
</template>

<style scoped>
.tracker-main {
  max-width: 80%;
  font-family: system-ui, sans-serif;
  margin: auto auto 5rem;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-head h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
}

.page-head p {
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.actions, .edit-buttons {
  display: flex;
  gap: 0.5rem;
}

.goals-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
}

.goal-charts{
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.info-charts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

</style>
