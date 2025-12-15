<script setup>
import { ref, onMounted } from "vue"
import {deleteScan, getHistory} from "@/services/api/history.js"
import { USER_ID } from "@/services/api/config.js"
import TrashIcon from "@/components/icons/TrashIcon.vue"

const emit = defineEmits(["history-updated"])

const userHistory = ref([])

onMounted(updateHistory)

async function updateHistory() {
  userHistory.value = await getHistory(USER_ID)

  userHistory.value.forEach(item => {
    item.time = new Date(item.scanDateTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  })

  emit("history-updated")
}

async function deleteItem(scanId) {
  await deleteScan(scanId)

  userHistory.value = userHistory.value.filter(
      item => item.scanId !== scanId
  )
}

async function clearHistory() {
  await Promise.all(
      userHistory.value.map(item => deleteScan(item.scanId))
  )

  userHistory.value = []
}


</script>

<template>
  <section class="history-card">
    <div class="history-header">
      <h3>Food History</h3>

      <button v-if="userHistory.length" class="clear-btn" @click="clearHistory">
        <TrashIcon/> Clear History
      </button>
    </div>

    <div v-if="userHistory.length" class="history-list">
      <div v-for="item in userHistory" :key="item.scanId" class="history-row">
        <div class="history-left">
          <p class="food-name">{{ item.foodName }}</p>
          <p class="food-time">{{ item.time }}</p>
        </div>

        <div class="history-right">
          <p class="kcal">
            {{ item.nutrients.find(n => n.type === 'Calories')?.amount }} kcal
          </p>
          <p
              class="macros"
              v-if="item.nutrients.some(n => n.type !== 'Calories')"
          >
            <template
                v-for="(n, index) in item.nutrients.filter(n => n.type !== 'Calories')"
                :key="n.nutrientId"
            >
              <span v-if="index > 0"> · </span>
              {{ n.type }}: {{ n.amount }}{{ n.unit }}
            </template>
          </p>
        </div>

        <button
            class="icon-button"
            @click="deleteItem(item.scanId)"
            title="Delete"
        >
          <TrashIcon />
        </button>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>No foods tracked yet</p>
      <p>Scanned foods will appear here</p>
    </div>
  </section>
</template>

<style scoped>

.history-card {
  background: var(--main-bg-color);
  border: var(--border-default);
  border-radius: 1rem;
  padding: 1.5rem;
  max-width: 100%;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.history-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.clear-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: var(--border-default);
  background: var(--main-bg-color);
  cursor: pointer;
  font-size: 1rem;
}

.clear-btn:hover {
  background: var(--gray-bg-color);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--progress-bar-bg-color);
  border-radius: 0.75rem;
}

.history-left {
  flex: 1;
}

.food-name {
  font-weight: 500;
  margin: 0;
}

.food-time {
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  margin: 0.25rem 0 0;
}

.history-right {
  text-align: right;
}

.kcal {
  font-weight: bold;
  margin: 0;
}

.macros {
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  margin: 0.25rem 0 0;
}

.icon-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.icon-button:hover {
  opacity: 0.7;
}

.empty-state {
  text-align: center;
  color: var(--secondary-text-color);
  padding: 0;
}
</style>
