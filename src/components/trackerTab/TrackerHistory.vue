<script setup>
import { ref, onMounted } from "vue"
import { deleteScan, getHistory } from "@/services/api/history.js"
import { USER_ID } from "@/services/api/config.js"
import TrashIcon from "@/components/icons/TrashIcon.vue"
import MainButton from "@/components/utilities/MainButton.vue"

const emit = defineEmits(["history-updated"])

const userHistory = ref([])

const displayPopup = ref(false)
const scanIdToDelete = ref(null)
const deleteAll = ref(false)
const scanNameToDelete = ref(null)


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


function openDeleteOnePopup(item) {
  scanIdToDelete.value = item.scanId
  scanNameToDelete.value = item.foodName
  deleteAll.value = false
  displayPopup.value = true
}

function openDeleteAllPopup() {
  deleteAll.value = true
  scanIdToDelete.value = null
  displayPopup.value = true
}

function closePopup() {
  displayPopup.value = false
  scanIdToDelete.value = null
  deleteAll.value = false
}

async function confirmDelete() {
  if (deleteAll.value) {
    await Promise.all(userHistory.value.map(item => deleteScan(item.scanId)))
    userHistory.value = []
  }
  else if (scanIdToDelete.value) {
    await deleteScan(scanIdToDelete.value)
    userHistory.value = userHistory.value.filter(item => item.scanId !== scanIdToDelete.value)
  }
  closePopup()
}
</script>

<template>
  <section class="history-card">
    <div class="history-header">
      <h3>Food History</h3>

      <button v-if="userHistory.length" class="clear-btn" @click="openDeleteAllPopup">
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
            @click="openDeleteOnePopup(item)"
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

  <div class="confirmation popup" v-if="displayPopup">
    <p>
      <template v-if="deleteAll">
        Are you sure you want to delete <span class="danger-text">ALL</span> scans?
      </template>

      <template v-else>
        Are you sure you want to delete this
        <span class="scan-name">"{{ scanNameToDelete }}"</span>
        scan?
      </template>
    </p>



    <div class="button-row">
      <MainButton :black="false" @click="closePopup">
        Cancel
      </MainButton>
      <MainButton :black="true" @click="confirmDelete">
        Confirm
      </MainButton>
    </div>
  </div>
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

.confirmation.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: var(--main-bg-color);
  padding: 1.25rem;
  border-radius: 1rem;
  border: solid 0.1rem var(--secondary-bg-color);
}

.button-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.danger-text, .scan-name {
  color: var(--main-red-color);
  font-weight: bold;
}

</style>