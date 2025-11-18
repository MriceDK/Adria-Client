<template>
  <div class="cholesterol-panel">
    <p class="panel-title">Cholesterol Panel</p>

    <div class="cholesterol-list">
      <div
          v-for="item in cholesterol"
          :key="item.label"
          class="cholesterol-card"
          :class="cholesterolStatus(item)"
      >
        <div class="cholesterol-top">
          <h4 class="cholesterol-label">{{ item.label }}</h4>
          <p class="cholesterol-goal">{{ formatGoal(item.label, item.goal, item.unit) }}</p>
        </div>

        <div class="cholesterol-current">
          {{ item.current }} {{ item.unit }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import cholesterolData from "@/data/cholesterol.js";

const cholesterol = ref([]);

onMounted(() => {
  cholesterol.value = cholesterolData;
});

function formatGoal(label, goal, unit) {
  const numericGoal = parseFloat(goal);
  if (label === "HDL") return `≥${numericGoal} ${unit}`;
  return `<${numericGoal} ${unit}`;
}

function cholesterolStatus(item) {
  const {label, current, goal} = item;
  const value = parseFloat(current);
  const target = parseFloat(goal);

  if (label === "HDL") {
    return value >= target ? "good" : "low";
  } else {
    return value < target ? "good" : "low";
  }
}
</script>

<style scoped>

.panel-title {
  font-size: 1.5rem;
  color: #717182;
  margin-bottom: 1rem;
}

.cholesterol-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  gap: 1rem;
}

.cholesterol-card {
  border: 0.1rem solid lightgray;
  border-radius: 1rem;
  padding: 1rem;
}

.cholesterol-card.low {
  border-color: #fb2c36;
  background: #ffe9eb;
}

.cholesterol-card.low .cholesterol-label,
.cholesterol-card.low .cholesterol-current {
  color: #fb2c36;
}

.cholesterol-card.good {
  border-color: #22c55e;
  background: #dcfce7;
}

.cholesterol-card.good .cholesterol-label,
.cholesterol-card.good .cholesterol-current {
  color: #22c55e;
}

.cholesterol-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.cholesterol-label {
  font-size: 1.25rem;
  font-weight: normal;
  margin: 0;
}

.cholesterol-goal {
  color: gray;
  font-size: 0.85rem;
  margin: 0;
}

.cholesterol-current {
  font-size: 1.25rem;
  margin-top: 1rem;
}
</style>