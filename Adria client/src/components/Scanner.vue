<script setup>
import Camera from "@/components/Camera.vue";
import {ref} from "vue";
const scanning = ref(false);
</script>

<template>
  <div class="start-scan">
    <camera>
      <p class="scan-title">Start Scanning</p>
      <p class="scan-description">Point your camera at any food item to instantly get detailed nutrition information</p>
    </camera>
   </div>

  <div hidden class="scanning">
  </div>

<!--ScanCamera-->
<!--Text-->
<!--Scan button-->

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
.start-scan {
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
  max-width: 370px;
}
</style>