<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  imageSource: {
    type: String,
    required: true,
  },selectedTab: {
    type: String,
    required: true,
  }
})
const emit = defineEmits(['navigation-click'])

</script>

<template>
  <li @click="$emit('navigation-click',title)" :class="{selected: selectedTab === title}">
    {{ title }}
  </li>
</template>

<style scoped>
li{
  margin: 0;
  font-family: var(--main-font-family),sans-serif;
  font-weight: 600;
  padding: 0.25rem 0.25rem;
  border-radius: 50px;
  cursor: pointer;
  border: 0;
  background-color: var(--secondary-bg-color);
  width: 20%;
  float: left;
  font-size: 0.85rem;
  text-align: center;
}
div{

}
.selected{
  transition: ease-in 0.2s;
  background: var(--main-bg-color);
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;

}
</style>