<template>
  <section class="minerals-section">
    <StatisticsHeader
        title="Minerals"
        subtitle="Daily mineral intake goals"
        iconClass="minerals-icon"
    >
      <template #icon>
        <IconActivity />
      </template>

      <template #actions>
        <button v-if="!isEditingMinerals" @click="isEditingMinerals = true" class="btn">Edit</button>
        <template v-else>
          <button @click="cancelEdit" class="btn cancel">Cancel</button>
          <button @click="saveMinerals" class="btn save">Save</button>
        </template>
      </template>
    </StatisticsHeader>

    <div v-if="!isEditingMinerals" class="minerals-list">
      <StatCard
          v-for="item in minerals"
          :key="item.label"
          :class="['mineral-card', mineralStatus(item)]"
      >
        <template #header>
          <div class="mineral-top">
            <h4 class="mineral-label">{{ item.label }}</h4>
            <p class="mineral-goal">{{ item.goal }}{{ item.unit }} goal</p>
          </div>
        </template>

        <template #content>
          <div class="mineral-current">
            {{ item.current }}{{ item.unit }}
          </div>
        </template>
      </StatCard>
    </div>

    <div v-else class="minerals-edit">
      <div v-for="(mineral, i) in editableMinerals" :key="mineral.label" class="mineral-edit">
        <label>{{ mineral.label }} ({{ mineral.unit }})</label>
        <input v-model.number="editableMinerals[i].current" type="number" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import StatisticsHeader from "./common/StatisticsHeader.vue";
import StatCard from "./common/StatCard.vue";
import mineralsData from "@/data/minerals.js";
import "@/components/statistics/common/common.css";
import IconActivity from "@/components/icons/statisticsIcons/IconActivity.vue";

const isEditingMinerals = ref(false);
const minerals = ref([]);
const editableMinerals = ref([]);

onMounted(() => {
  minerals.value = mineralsData;
  editableMinerals.value = mineralsData;
});

function cancelEdit() {
  editableMinerals.value = minerals.value;
  isEditingMinerals.value = false;
}

function saveMinerals() {
  minerals.value = editableMinerals.value;
  isEditingMinerals.value = false;
}

function mineralStatus(item) {
  const progress = item.current / item.goal;
  if (progress >= 1) return "good";
  if (progress >= 0.9) return "near";
  return "low";
}
</script>

<style scoped>
.minerals-section {
  background: white;
  border: 0.1rem solid #E5E5E5;
  border-radius: 1rem;
  padding: 2rem;
}

.minerals-list, .minerals-edit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  gap: 1rem;
}

.mineral-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.mineral-label {
  font-size: 1.25rem;
  color: #FB2C36;
  font-weight: normal;
  margin: 0;
}

.mineral-goal {
  color: gray;
  font-size: 0.85rem;
  margin: 0;
}

.mineral-current {
  color: #FB2C36;
  font-size: 1.25rem;
  margin-top: 1rem;
}

.mineral-edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 0.1rem solid lightgray;
  border-radius: 1rem;
}

.mineral-edit input {
  width: 4rem;
  padding: 0.25rem;
  border: 0.1rem solid lightgray;
  border-radius: 0.5rem;
  text-align: center;
}
</style>