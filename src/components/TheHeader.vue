<script setup>
import NavigationButton from "@/components/utilities/NavigationButton.vue";
import {ref} from "vue";
const emit = defineEmits(['navigation-click', 'logo-click'])

function handleNavigationClick(title) {
  selectedTab.value = title;
  emit("navigation-click", selectedTab.value);
}

function handleLogoClick() {
  emit("logo-click", "Scanner");
  selectedTab.value = "Scanner";
}

const selectedTab = ref("Scanner")
</script>

<template>
  <img @click="handleLogoClick" class="logo" src="../assets/icons/nutriscan-high-resolution-logo_1-Photoroom.png" alt="Nutriscan Logo">
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
.logo {
  display: block;
  height: 4rem;
  margin: 0 auto;
  cursor: pointer;
}
.logo:hover {
  transition: ease-in 0.1s;
  filter: brightness(0) saturate(100%) invert(56%) sepia(21%) saturate(958%) hue-rotate(82deg) brightness(88%) contrast(88%);
}

nav {
  margin: 1rem auto 0 auto;
  width: 45rem;
  height: 1.55rem;
  background-color: var(--secondary-bg-color);
  border-radius: 50px;
  padding: 0.25rem 0;
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
  background-size: 1rem;
  background-position-y: center;
  background-position-x: 19%;
}

.scanner {
  background-image: url("../assets/icons/scanning-icon.svg");
}
.tracker {
  background-image: url("../assets/icons/trackerIcon.png");
}
.statistics {
  background-image: url("../assets/icons/statsicon.png");
}
.shop {
  background-image: url("../assets/icons/shopIcon.svg");
  background-size: 1.3rem;
}
</style>