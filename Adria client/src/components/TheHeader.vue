<script setup>
import NavigationButton from "@/components/NavigationButton.vue";
import {ref} from "vue";


function handleNavigationClick(title) {
  console.log('Received title:', title)
}
const currentNavigation = ref(1)
</script>

<template>
  <nav>
    <NavigationButton title="scanner" @NavigationClick="handleNavigationClick"></NavigationButton>
    <NavigationButton title="tracker" @NavigationClick="handleNavigationClick"></NavigationButton>
    <NavigationButton title="statistics" @NavigationClick="handleNavigationClick"></NavigationButton>
    <NavigationButton title="shop" @NavigationClick="handleNavigationClick"></NavigationButton>
  </nav>
</template>

<style scoped>
nav {
  margin: 27px auto 0 auto;
  position: relative;
  width: 590px;
  height: 30px;
  background-color: #34495e;
  border-radius: 8px;
  font-size: 0;
  padding: 10px;
}
</style>