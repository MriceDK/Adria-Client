<template>
  <section class="goals-section">
    <StatisticsHeader
        title="Daily Intake Goals"
        subtitle="Macronutrient targets"
        iconClass="goals-icon"
    >
      <template #icon>
        <IconDroplet />
      </template>

      <template #actions>
        <button v-if="!isEditing" @click="isEditing = true" class="btn">Change Goals</button>
        <template v-else>
          <button @click="cancelEdit" class="btn cancel">Cancel</button>
          <button @click="saveGoals" class="btn save">Save</button>
        </template>
      </template>
    </StatisticsHeader>

    <div v-if="!isEditing" class="goals-list">
      <StatCard
          v-for="item in goals"
          :key="item.label"
          :color="item.label === 'Water' ? 'blue' : 'default'"
      >
        <template #header>
          <div class="goal-header" :class="{ blueText: item.label === 'Water' }">
            <h4>{{ item.label }}</h4>
            <p class="goal-values">
              {{ item.current }}{{ item.unit }} / {{ item.goal }}{{ item.unit }}
            </p>
          </div>
        </template>

        <template #content>
          <ProgressBar
              :value="item.current"
              :max="item.goal"
              :color="item.label === 'Water' ? 'linear-gradient(90deg, #60a5fa, #3b82f6)' : null"
          />
          <p
              class="remaining"
              :class="{ blueText: item.label === 'Water' }"
          >
            {{ (item.goal - item.current).toFixed(1) }}{{ item.unit }} remaining
          </p>
        </template>
      </StatCard>
    </div>

    <div v-else class="goals-edit">
      <div v-for="(goal, index) in editableGoals" :key="goal.label" class="goal-edit">
        <label>{{ goal.label }} ({{ goal.unit }})</label>
        <input type="number" v-model.number="editableGoals[index].goal" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import StatisticsHeader from "./common/StatisticsHeader.vue";
import StatCard from "./common/StatCard.vue";
import ProgressBar from "../utilities/ProgressBar.vue";
import goalsData from "@/data/dailyGoals.js";
import "@/components/statistics/common/common.css";
import IconDroplet from "@/components/icons/statisticsIcons/IconDroplet.vue";

const isEditing = ref(false);
const goals = ref([]);
const editableGoals = ref([]);

onMounted(() => {
  goals.value = goalsData;
  editableGoals.value = goalsData;
});

function cancelEdit() {
  editableGoals.value = goals.value;
  isEditing.value = false;
}

function saveGoals() {
  goals.value = editableGoals.value;
  isEditing.value = false;
}
</script>

<style scoped>
.goals-section {
  background: white;
  border: 0.1rem solid #E5E5E5;
  border-radius: 1rem;
  padding: 2rem;
}

.goals-list, .goals-edit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1rem;
}

.goal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.goal-header h4 {
  margin: 0;
  font-weight: bold;
  font-size: 1.25rem;
  color: #717182;
}

.goal-values {
  margin: 0;
  font-size: 1.3rem;
  color: #000000;
}

.remaining {
  color: gray;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: left;
}

.blueText .goal-values, .blueText h4, .remaining.blueText {
  color: #2B7FFF;
}

.goal-edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 0.1rem solid #E5E5E5;
  border-radius: 1rem;
}

.goal-edit input {
  width: 4rem;
  padding: 0.25rem;
  border: 0.1rem solid lightgray;
  border-radius: 0.5rem;
  text-align: center;
}
</style>