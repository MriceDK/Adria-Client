<script setup>
import {onMounted, ref} from "vue";
import MainButton from "@/components/utilities/MainButton.vue";

let isScanning = ref(false);
let cameraEnabled = ref(false);

const canvas = ref(null);
const video = ref(null);
const ctx = ref(null);

const emit = defineEmits(['scan', 'scanned'])

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
          .catch(() => cameraEnabled.value = false);
    }
  });

function setStream(stream) {
  video.value.srcObject = stream;
  video.value.play();
  requestAnimationFrame(draw);
  if (isScanning.value) {
    emit('scan')
  }
  isScanning.value = false;
  cameraEnabled.value = true;
}

function draw() {
  if (canvas.value && video.value) {
    ctx.value.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
    if (isScanning.value) {
      scan();
    } else requestAnimationFrame(draw);
  }
}

function scan() {
  setTimeout(function () {emit('scanned')}, 3000)

}

function startScan() {
  isScanning.value = true;
  emit('scan')
  // TODO: Change this so that it sends the image to the server
  takePhoto();
}

function takePhoto() {
  const photoData = canvas.value.toDataURL();
}

</script>

<template>
  <video ref="video" autoplay playsinline webkit-playsinline muted hidden/>
  <div v-if="!cameraEnabled" class="camera-icon-wrapper">
    <img src="../../assets/icons/camera-disallowed-icon.svg" class="camera-icon" alt="camera icon" >
  </div>
    <canvas v-show="cameraEnabled" ref="canvas" class="camera-stream" width="512" height="512"></canvas>
  <img src="../../assets/icons/scanning-icon.svg" class="scanning" v-show="isScanning" alt="in progress scanning icon">
  <slot></slot>
  <main-button :disabled="!cameraEnabled || isScanning" :black="true" @click="startScan">Start Scanning</main-button>
</template>

<style>

.camera-stream {
  position: relative;
  z-index: 1;
  fill: var(--secondary-bg-color);
  border: solid 0.35rem var(--main-text-color);
  padding: 0.25rem;
  margin-top: 3rem;
  align-content: center;
  height: 50vh;
  max-width: 50%;
  border-radius: 10%;
}

.scanning {
  height: 25%;
  width: 25%;
  position: absolute;
  z-index: 2;
  padding-bottom: 7.5rem;
}



.camera-icon-wrapper {
  background: var(--secondary-bg-color);
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.camera-icon {
  width: 5rem;
  height: 5rem;
}

</style>