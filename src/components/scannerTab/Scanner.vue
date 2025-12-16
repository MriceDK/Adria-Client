<script setup>
import Camera from "@/components/scannerTab/Camera.vue";
import FoodInfo from "@/components/scannerTab/FoodInfo.vue";
import History from "@/components/scannerTab/History.vue";
import {ref} from "vue";
import {deleteScan, getRandomFood} from "@/services/api/scanner.js";
import {USER_ID} from "@/services/api/config.js";

const scanning = ref(false);
const scanned = ref(false);
const updateHistory = ref(false);

const food = ref({
  foodName: "Not available"
});

async function startScan() {
  scanning.value = !scanning.value;
  food.value = await getRandomFood(USER_ID);
}

function startOver(scanId) {
  scanning.value = false;
  scanned.value = false;
  deleteScan(scanId).then(() => updateHistory.value = true);
}

function addToTracker() {
  scanned.value = false;
  scanning.value = false;
  updateHistory.value = true;

}

</script>

<template>
  <div class="scanner-screen">
    <div class="scan-start-screen">
      <camera @scan="startScan" @scanned="scanned = true" v-if="!scanned">
          <div v-show="!scanning" class="start-scan">
            <p class="scan-title">Start Scanning</p>
            <p class="scan-description">Point your camera at any food item to instantly get detailed nutrition information</p>
          </div>
          <div v-show="scanning" class="scan">
            <p class="scan-title">Scanning...</p>
            <p class="scan-description">Analyzing nutrition information</p>
          </div>
        </camera>
      <food-info @add-to-tracker="addToTracker" @cancel="startOver" :food-object="food" v-else></food-info>
    </div>
    <history :update-history="updateHistory" @history-updated="updateHistory = false"></history>
  </div>
</template>


<style scoped>
template {
  height: 100vh;
}

.scanner-screen {
  display: flex;
  gap: 2rem;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-left: 20%;
  margin-right: 10%;
}

.scan-start-screen {
  font-family: var(--main-font-family),sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  background: var(--main-bg-color);
}

.scan-title {
  font-family: var(--main-font-family),sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
  text-align: center;
}

.scan-description {
  color: var(--secondary-text-color);
  font-size: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 23rem;
}

.scanner {

}
</style>