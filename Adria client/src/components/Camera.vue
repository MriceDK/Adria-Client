<script setup>
import {onMounted, ref} from "vue";
import MainButton from "@/components/MainButton.vue";
// prop boolean if true pause video
let scanning = ref(false);
let cameraEnabled = ref(false);

const canvas = ref(null);
const video = ref(null);
const ctx = ref(null);

const constraints = ref({
  video: true,
  audio: false
})
onMounted(async () => {
  if (video.value && canvas.value) {
    ctx.value = canvas.value.getContext("2d");

      await navigator.mediaDevices.getUserMedia(constraints.value)
          .then(stream =>
          {
            setStream(stream);
          })
          .catch(e => {
            console.error(e);
            cameraEnabled.value = false;
          });
    }
  });


function setStream(stream) {
  video.value.srcObject = stream;
  video.value.play();
  requestAnimationFrame(draw);
  cameraEnabled.value = true;
}

function draw() {
  ctx.value.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
  if (scanning.value) {
    scan();
  } else requestAnimationFrame(draw);
}

function scan() {
  scanning.value = false;
  setTimeout(function () {
    setStream(video.value.srcObject);
  }, 1000)
}

</script>

<template>
    <video ref="video" class="camera-stream" autoplay playsinline webkit-playsinline muted hidden/>
    <div v-show="!cameraEnabled" class="camera-icon-wrapper">
      <svg class="camera-icon" width="128" height="128" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="48" y="128" width="416" height="288" rx="80" stroke="#000" stroke-width="24" fill="none"/>
        <path d="M176 128c8-32 26-48 56-48h48c29 0 48 16 56 48" stroke="#000" stroke-width="24" fill="none" stroke-linecap="round"/>
        <circle cx="256" cy="272" r="96" stroke="#000" stroke-width="24" fill="none"/>
      </svg>
    </div>
    <canvas v-show="cameraEnabled" ref="canvas" class="camera-stream" width="512" height="512"></canvas>
    <slot></slot>
    <main-button :black="true" @click="scanning = true">Start Scanning</main-button>
</template>

<style>

.camera-stream {
  margin-top: 5rem;
  align-content: center;
  height: 50vh;
  max-width: 50%;
  border-radius: 10%;
}

.camera-icon-wrapper {
  background: #f6f6f7;
  border-radius: 50%;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.camera-icon {
  width: 80px;
  height: 80px;
  color: #888e9f;
}

</style>