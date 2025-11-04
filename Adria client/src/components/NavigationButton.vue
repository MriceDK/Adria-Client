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
    <div>

    </div>
    {{ title }}

  </li>
</template>

<style scoped>
li{
  padding: 10px 10px;
  border-radius: 50px;
  cursor: pointer;
  border: 0;
  background-color: white;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  width: 20%;
  float: left;
  font-size: 1rem;
  text-align: center;
}
div{

}
.selected{
  background: #000;
}
</style>