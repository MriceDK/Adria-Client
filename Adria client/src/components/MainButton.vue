<script setup>
const props = defineProps({black : Boolean})
</script>

<template>
  <button :class="{black : props.black}"><slot></slot></button>
</template>

<style scoped>
button {
  background-color: transparent;
  padding: 0.5rem;
  font-size: 1rem;
  max-width: fit-content;
  border: solid 0.075rem #181818;
  border-radius: 0.35rem;
}
button:hover {
  background-color: lightgray;
}

.black {
  background: black;
  color: white;
}

</style>