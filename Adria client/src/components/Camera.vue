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
    <canvas ref="canvas" class="camera-stream" width="512" height="512"></canvas>
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

</style>