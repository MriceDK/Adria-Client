<script setup>
import Camera from "@/components/scannerTab/Camera.vue";
import FoodInfo from "@/components/scannerTab/FoodInfo.vue";
import {ref} from "vue";

const scanning = ref(false);
const scanned = ref(false);

</script>

<template>
  <div class="scan-start-screen">
    <!--ScanCamera-->
    <!--Text-->
    <!--Scan button-->
    <camera @scan="scanning = !scanning" @scanned="scanned = true" v-if="!scanned">
      <div v-show="!scanning" class="start-scan">
        <p class="scan-title">Start Scanning</p>
        <p class="scan-description">Point your camera at any food item to instantly get detailed nutrition information</p>
      </div>
      <div v-show="scanning" class="scan">
        <p class="scan-title">Scanning...</p>
        <p class="scan-description">Analyzing nutrition information</p>
      </div>
    </camera>
    <food-info v-else></food-info>
   </div>

  <div hidden class="scanning">
  </div>




<!--Open webcam sequence-->
<!--"Analyze webcam"-->

<!--Display Food info-->
<!--Add tracker button-->
<!--Scan again-->
<!--Dismiss button-->
</template>

<style scoped>
template {
  height: 100vh;
}
.scan-start-screen {
  font-family: var(--main-font-family),sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  background: #fff;
}

.scan-title {
  font-family: var(--main-font-family),sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
  text-align: center;
}

.scan-description {
  color: #989aa9;
  font-size: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 23rem;
}
</style>