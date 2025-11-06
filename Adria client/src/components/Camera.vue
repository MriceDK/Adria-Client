<script setup>
import {onMounted, ref} from "vue";
import MainButton from "@/components/MainButton.vue";

let isScanning = ref(false);
let cameraEnabled = ref(false);

const canvas = ref(null);
const video = ref(null);
const ctx = ref(null);

const emit = defineEmits(['scan'])

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
  if (isScanning.value) {
    emit('scan')
  }
  isScanning.value = false;
  cameraEnabled.value = true;
}

function draw() {
  ctx.value.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
  if (isScanning.value) {
    scan();
  } else requestAnimationFrame(draw);
}

function scan() {
  setTimeout(function () {
    setStream(video.value.srcObject);
  }, 1000000)

}

function startScan() {
  isScanning.value = true;
  emit('scan')
}

</script>

<template>
  <video ref="video" autoplay playsinline webkit-playsinline muted hidden/>
  <div v-if="!cameraEnabled" class="camera-icon-wrapper">
    <svg class="camera-icon" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
    <canvas v-show="cameraEnabled" ref="canvas" class="camera-stream" width="512" height="512"></canvas>
    <svg class="scanning" v-show="isScanning"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24"
         fill="none"
         stroke="#000000"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round"
    >
      <path d="M3 7V5a2 2 0 012-2h2" />
      <path d="M17 3h2a2 2 0 012 2v2" />
      <path d="M21 17v2a2 2 0 01-2 2h-2" />
      <path d="M7 21H5a2 2 0 01-2-2v-2" />
    </svg>
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