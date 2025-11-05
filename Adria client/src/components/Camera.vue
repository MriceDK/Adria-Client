<script setup>
import {onMounted, ref} from "vue";

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
        .then(SetStream)
        .catch(e => console.error(e));
  }
});

function SetStream(stream) {
  video.value.srcObject = stream;
  video.value.play();

  requestAnimationFrame(Draw);
}

function Draw() {
  ctx.value.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

  requestAnimationFrame(Draw);
}

</script>

<template>
    <video ref="video" class="camera-stream" autoplay playsinline webkit-playsinline muted hidden/>
    <canvas ref="canvas" class="camera-stream" width="512" height="512"></canvas>
</template>

<style>

.camera-stream {
  margin: 5rem;
  align-content: center;
  width: 50%;
}

</style>