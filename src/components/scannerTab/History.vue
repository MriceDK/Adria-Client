<script setup>

import {getHistory} from "@/services/api/history.js";
import {USER_ID} from "@/services/api/config.js";
import {ref, watch} from "vue";
import MainButton from "@/components/utilities/MainButton.vue";
import {deleteScan} from "@/services/api/scanner.js";

const props = defineProps({
  updateHistory: Boolean
});
const emit = defineEmits(['history-updated']);

const updateOnChange = watch(() => props.updateHistory, (newVal) => {
  if (newVal) {
    updateHistory();
  }
});


const userHistory = ref([]);
const displayPopup = ref(false);
const scanIdToDelete = ref(null);

async function updateHistory() {
  userHistory.value = await getHistory(USER_ID);
  userHistory.value.map(item => {
    item.scanDateTime = new Date(item.scanDateTime).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  });
  emit('history-updated');
}

function closePopup() {
  displayPopup.value = false;
}

function openPopup(e) {
  scanIdToDelete.value = e.currentTarget.closest('li').getAttribute('data-scan-id');
  displayPopup.value = true;
}

function confirmDelete() {
  deleteScan(scanIdToDelete.value).then(updateHistory);
  scanIdToDelete.value = null;
  closePopup();
}

updateHistory();
</script>

<template>
  <div class="history-screen">
    <p class="title">Recent Foods</p>
    <ul v-if="userHistory.length > 0" class="history-list">
      <li v-for="item in userHistory" :key="item.scanId" class="history-item" :data-scan-id="item.scanId">
        <div class="top-row">
          <div class="food-info">
            <div class="general-info">
              <p class="edibility" :class="{ 'edible' : item.foodEdible, 'not-edible' : !item.foodEdible}">.</p>
              <p class="food-name">{{ item.foodName }}</p>
            </div>
            <p class="date-tracked">{{ item.scanDateTime }}</p>
          </div>
          <img src="../../assets/icons/trash-icon.svg" alt="Delete Icon" class="delete-icon"  @click="openPopup"/>
        </div>
        <ul class="nutrients">
          <li class="nutrient" v-for="nutrient in item.nutrients" :key="nutrient.nutrientId">
            {{ nutrient.type }}: {{ nutrient.amount }} {{ nutrient.unit }}
          </li>
        </ul>
      </li>
    </ul>
    <div v-else class="no-history">
      <p>No foods tracked yet</p>
      <p>Scanned foods will appear here</p>
    </div>
  </div>
  <div class="confirmation popup" v-if="displayPopup">
    <p>Are you sure you want to delete this scan?</p>
    <div class="button-row">
      <main-button :black="false" @click="closePopup">Cancel</main-button>
      <main-button :black="true" @click="confirmDelete">Confirm</main-button>
    </div>
  </div>
</template>

<style scoped>
.history-screen {
  border: solid 2px var(--secondary-bg-color);
  border-radius: 1rem;
  padding: 1rem;
  height: 70vh;
  width: 25%;
  font-family: var(--main-font-family), sans-serif;

  display: flex;
  flex-direction: column;

}

.food-name {
  font-weight: 600;
  font-size: 1rem;
}

.date-tracked {
  font-size: 0.8rem;
  color: var(--secondary-text-color);
  margin-top: -1rem;
}

.history-item {
  border: solid 1px var(--secondary-bg-color);
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.nutrients {
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;

  list-style-type: none;
  padding: 0;
  margin: 0.5rem 0;
}

.nutrient {
  background-color: var(--secondary-bg-color);
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
}

.no-history {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10rem;
  color: var(--secondary-text-color);
  font-size: 0.9rem;
  text-align: center;

}

.title {
  background-image: url("../../assets/icons/history-icon.svg");
  font-family: var(--main-font-family), sans-serif;
  background-repeat: no-repeat;
  background-size: 1.5rem;
  background-position: left center;
  padding-left: 2rem;
  margin-bottom: 1rem;
}

.history-list {
  list-style-type: none;
  padding: 0;
  margin: 0;

  overflow-y: scroll;
}

.confirmation.popup {
  display: flex;
  flex-flow: column nowrap;
  font-family: var(--main-font-family), sans-serif;
  position: absolute;
  z-index: 2;
  gap: 0.5rem;
  background-color: var(--main-bg-color);
  padding: 1.25rem;
  border: solid 0.1rem var(--secondary-bg-color);
  border-radius: 1rem;
  top: 35%;
  left: 37.5%;
}

.confirmation.popup p {
  font-size: 1rem;
  text-align: center;
  margin-left: 0.25rem;
}

.button-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
}

.delete-icon {
  width: 1.25rem;
  height: 1.25rem;
  float: right;
  cursor: pointer;
}
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.general-info {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-start;
}

.edibility {
  font-size: 0;
  width: 0.2rem;
  height: 0.2rem;
  padding: 0.2rem 0.2rem;
  border-radius: 100%;

}

.edible {
  background-color: var(--main-green-color);
  color: var(--main-green-color);
}

.not-edible {
  background-color: var(--main-red-color);
  color: var(--main-red-color);
}

</style>