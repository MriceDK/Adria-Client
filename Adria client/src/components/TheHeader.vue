<script setup>
import NavigationButton from "@/components/utilities/NavigationButton.vue";
import {ref} from "vue";
const emit = defineEmits(['navigation-click'])

function handleNavigationClick(title) {
  selectedTab.value = title;
  emit("navigation-click", selectedTab.value);
}
const currentNavigation = ref(1)
const selectedTab = ref("Scanner")
</script>

<template>
  <nav>
    <ul>
      <NavigationButton class="icon scanner" title="Scanner" imageSource="../assets/icons/trackerIcon.png" :selectedTab="selectedTab" @navigation-click="handleNavigationClick"></NavigationButton>
      <NavigationButton class="icon tracker" title="Tracker" imageSource="../assets/icons/trackerIcon.png" :selectedTab="selectedTab" @navigation-click="handleNavigationClick"></NavigationButton>
      <NavigationButton class="icon statistics" title="Statistics" imageSource="../assets/icons/trackerIcon.png" :selectedTab="selectedTab" @navigation-click="handleNavigationClick"></NavigationButton>
      <NavigationButton class="icon shop" title="Shop" imageSource="../assets/icons/trackerIcon.png" :selectedTab="selectedTab" @navigation-click="handleNavigationClick"></NavigationButton>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  margin: 2rem auto 0 auto;
  width: 40rem;
  height: 1.45rem;
  background-color: var(--secondary-bg-color);
  border-radius: 50px;
  padding: 5px 0 5px 0;
  font-size: 0;
}
ul{
  margin: 0;
  padding: 0;
  max-width: 100% ;
  display: flex;
  flex-flow: row;

  justify-content: space-evenly;
  list-style-type: none;
}
.icon {
  background-repeat: no-repeat;
  background-size: 0.8rem;
  background-position-y: center;
  background-position-x: 19%;
}

.scanner {
  background-image: url("../assets/icons/scan-svgrepo-com.svg");
}
.tracker {
  background-image: url("../assets/icons/trackerIcon.png");
}
.statistics {
  background-image: url("../assets/icons/statsicon.png");
}
.shop {
  background-image: url("../assets/icons/shopIcon.svg");
  background-size: 1rem;
}
</style>