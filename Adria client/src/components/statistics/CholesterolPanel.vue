<template>
  <div class="cholesterol-panel">
    <p class="panel-title">Cholesterol Panel</p>

    <div class="cholesterol-list">
      <StatCard
          v-for="item in cholesterol"
          :key="item.label"
          color="red"
      >
      <template #header>
        <div class="cholesterol-top">
          <h4 class="cholesterol-label">{{ item.label }}</h4>
          <p class="cholesterol-goal">{{ item.goalLabel }}</p>
        </div>
      </template>

      <template #content>
        <div class="cholesterol-current">
          {{ item.current }} {{ item.unit }}
        </div>
      </template>
      </StatCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import StatCard from "./common/StatCard.vue";
import cholesterolData from "@/data/cholesterol.js";

const cholesterol = ref([]);

onMounted(() => {
  cholesterol.value = cholesterolData;
});
</script>

<style scoped>
.cholesterol-panel {
  margin-top: 2rem;
}

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

.cholesterol-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.cholesterol-label {
  font-size: 1.25rem;
  color: #FB2C36;
  font-weight: normal;
  margin: 0;
}

.cholesterol-goal {
  color: gray;
  font-size: 0.85rem;
  margin: 0;
}

.cholesterol-current {
  color: #FB2C36;
  font-size: 1.25rem;
  margin-top: 1rem;
}

</style>
