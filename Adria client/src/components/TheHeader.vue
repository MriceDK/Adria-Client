<script setup>
import NavigationButton from "@/components/NavigationButton.vue";
import {ref} from "vue";


function handleNavigationClick(title) {
  selectedTab.value = title;

}
const currentNavigation = ref(1)
const selectedTab = ref("scanner")
</script>

<template>
  <nav>
    <ul>
      <NavigationButton title="scanner" imageSource="../assets/icons/trackerIcon.png" :selectedTab="selectedTab" @navigation-click="handleNavigationClick"></NavigationButton>
      <NavigationButton title="tracker" imageSource="../assets/icons/trackerIcon.png" :selectedTab="selectedTab" @navigation-click="handleNavigationClick"></NavigationButton>
      <NavigationButton title="statistics" imageSource="../assets/icons/trackerIcon.png" :selectedTab="selectedTab" @navigation-click="handleNavigationClick"></NavigationButton>
      <NavigationButton title="shop" imageSource="../assets/icons/trackerIcon.png" :selectedTab="selectedTab" @navigation-click="handleNavigationClick"></NavigationButton>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  margin: 27px auto 0 auto;
  width: 700px;
  height: 40px;
  background-color: lightgray;
  border-radius: 8px;
  padding: 10px 0 10px 0;
  font-size: 0;
}
ul{
  list-style-type: none;
}
</style>