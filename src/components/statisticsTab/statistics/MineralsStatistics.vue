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
    </StatisticsHeader>

    <div class="minerals-list">
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
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStats } from "@/composables/useStats.js";
import StatisticsHeader from "@/components/statisticsTab/common/StatisticsHeader.vue";
import StatCard from "@/components/statisticsTab/common/StatCard.vue";
import "@/components/statisticsTab/common/common.css";
import IconActivity from "@/components/icons/statisticsIcons/IconActivity.vue";

const minerals = ref([]);

onMounted(async () => {
  minerals.value = await useStats("minerals");
});

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

.minerals-list {
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

/* Card color states */
.mineral-card.low {
  border-color: #fb2c36;
  background: #ffe9eb;
}

.mineral-card.near {
  border-color: #d1d5db;
  background: #f9fafb;
}

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