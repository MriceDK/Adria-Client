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
  background: var(--main-bg-color);
  border: var(--border-default);
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
  color: var(--main-red-color);
  font-weight: normal;
  margin: 0;
}

.mineral-goal {
  color: var(--secondary-text-color);
  font-size: 0.85rem;
  margin: 0;
}

.mineral-current {
  color: var(--main-red-color);
  font-size: 1.25rem;
  margin-top: 1rem;
}

/*noinspection CssUnusedSymbol*/
.mineral-card.low {
  border-color: var(--main-red-color);
  background: var(--red-bg-color);
}

/*noinspection CssUnusedSymbol*/
.mineral-card.near {
  border-color: var(--secondary-text-color);
  background: var(--gray-bg-color);
}

/*noinspection CssUnusedSymbol*/
.mineral-card.good {
  border-color: var(--main-green-color);
  background: var(--green-bg-color);
}

.mineral-card.low .mineral-current,
.mineral-card.low .mineral-label {
  color: var(--main-red-color);
}

.mineral-card.good .mineral-current,
.mineral-card.good .mineral-label {
  color: var(--main-green-color);
}

.mineral-card.near .mineral-current,
.mineral-card.near .mineral-label {
  color: var(--secondary-text-color);
}
</style>