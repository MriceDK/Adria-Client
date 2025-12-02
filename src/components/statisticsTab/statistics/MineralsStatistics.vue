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
import { ref, onMounted, onUnmounted } from "vue";
import { useStats } from "@/composables/useStats.js";
import { postUserStats } from "@/services/statsService.js";
import StatisticsHeader from "@/components/statisticsTab/common/StatisticsHeader.vue";
import StatCard from "@/components/statisticsTab/common/StatCard.vue";
import "@/components/statisticsTab/common/common.css";
import IconActivity from "@/components/icons/statisticsIcons/IconActivity.vue";

const minerals = ref([]);
const editableMinerals = ref([]);
const isEditingMinerals = ref(false);
let intervalId = null;

async function loadMinerals() {
  const fresh = await useStats("minerals");

  if (!isEditingMinerals.value) {
    minerals.value = fresh;
  }
}

onMounted(async () => {
  await loadMinerals();
  intervalId = setInterval(loadMinerals, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

function cancelEdit() {
  isEditingMinerals.value = false;
}

async function saveMinerals() {
  //remove it later to other place
  const userId = "d4e5f6a7-b8c9-4d5e-1f2a-4b5c6d7e8f9a";

  await postUserStats(userId, editableMinerals.value);
  isEditingMinerals.value = false;
}

function mineralStatus(item) {
  const ratio = item.current / item.goal;
  if (ratio >= 1) return "good";
  if (ratio >= 0.9) return "near";
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

/*noinspection CssUnusedSymbol*/
.mineral-card.low {
  border-color: #fb2c36;
  background: #ffe9eb;
}

/*noinspection CssUnusedSymbol*/
.mineral-card.near {
  border-color: #d1d5db;
  background: #f9fafb;
}

/*noinspection CssUnusedSymbol*/
.mineral-card.good {
  border-color: #22c55e;
  background: #dcfce7;
}

.mineral-card.low .mineral-current,
.mineral-card.low .mineral-label {
  color: #fb2c36;
}

.mineral-card.good .mineral-current,
.mineral-card.good .mineral-label {
  color: #22c55e;
}

.mineral-card.near .mineral-current,
.mineral-card.near .mineral-label {
  color: #6b7280;
}

</style>