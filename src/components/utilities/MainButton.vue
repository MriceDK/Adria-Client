<script setup>
const props = defineProps({
  black : Boolean,
  disabled : Boolean
});
</script>

<template>
  <button :disabled="props.disabled" :class="{black : props.black}"><slot></slot></button>
</template>

<style scoped>
button {
  cursor: pointer;
  font-family: var(--main-font-family),sans-serif;
  background-color: var(--main-bg-color);
  padding: 0.5rem 2rem;
  font-size: 1rem;
  border: solid 0.075rem var(--secondary-bg-color);
  border-radius: 0.35rem;
  margin-left: 0.5rem;
}
button:hover {
  background-color: var(--secondary-bg-color);
}

.black {
  background: var(--main-text-color);
  color: var(--main-bg-color);
}

.black:hover {
  background: var(--hover-black-color);
}

button:disabled {
  opacity: 50%;
  cursor: not-allowed;
}

button:disabled:hover {
  opacity: 50%;
  background-color: var(--main-bg-color);
}
.black:disabled:hover {
  opacity: 50%;

  background-color: var(--main-text-color)
}

</style>