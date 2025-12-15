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
          <p class="cholesterol-goal">{{ formattedGoal(item) }}</p>
        </div>

        <div class="cholesterol-current">
          {{ item.current }} {{ item.unit }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStats } from "@/services/api/useStats.js";

const cholesterol = ref([]);

function formattedGoal(item) {
  if (item.label.includes("HDL")) {
    return `≥${item.goal} ${item.unit}`;
  }
  return `<${item.goal} ${item.unit}`;
}

function cholesterolStatus(item) {
  const value = Number(item.current) || 0;
  const goal = Number(item.goal) || 0;

  if (item.label.includes("HDL")) {
    return value >= goal ? "good" : "low";
  }
  return value < goal ? "good" : "low";
}

onMounted(async () => {
  cholesterol.value = await useStats("cholesterol");
});
</script>

<style scoped>
.panel-title {
  font-size: 1.5rem;
  color: var(--secondary-text-color);
  margin-bottom: 1rem;
}

.cholesterol-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  gap: 1rem;
}

.cholesterol-card {
  border: var(--border-default);
  border-radius: 1rem;
  padding: 1rem;
}

/*noinspection CssUnusedSymbol*/
.cholesterol-card.low {
  border-color: var(--main-red-color);
  background: var(--red-bg-color);
}

/*noinspection CssUnusedSymbol*/
.cholesterol-card.good {
  border-color: var(--main-green-color);
  background: var(--green-bg-color);
}

.cholesterol-card.low .cholesterol-label,
.cholesterol-card.low .cholesterol-current {
  color: var(--main-red-color);
}

.cholesterol-card.good .cholesterol-label,
.cholesterol-card.good .cholesterol-current {
  color: var(--main-green-color);
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