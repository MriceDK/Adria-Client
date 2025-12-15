<script setup>

import {getHistory} from "@/services/api/history.js";
import {USER_ID} from "@/services/api/config.js";
import {ref, watch} from "vue";

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

updateHistory();
</script>

<template>
  <div class="history-screen">
    <p class="title">Recent Foods</p>
    <div v-if="userHistory.length > 0" class="history-list">
      <div v-for="item in userHistory" :key="item.scanId" class="history-item">
        <p class="food-name">{{ item.foodName }}</p>
        <p class="date-tracked">{{ item.scanDateTime }}</p>
      </div>
    </div>
    <div v-else class="no-history">
      <p>No foods tracked yet</p>
      <p>Scanned foods will appear here</p>
    </div>
  </div>
</template>

<style scoped>
.history-screen {
  border: solid 2px var(--secondary-bg-color);
  border-radius: 1rem;
  padding: 1rem;
  height: 100%;
  width: 25%;
  font-family: var(--main-font-family), sans-serif;
}

.history-item {
  background-color: var(--secondary-bg-color);
  border: solid 1px var(--secondary-bg-color);
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
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

</style>