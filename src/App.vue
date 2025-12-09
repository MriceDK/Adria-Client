<script setup>
import TheHeader from "@/components/TheHeader.vue";
import HealthProfile from "@/components/statisticsTab/HealthProfile.vue";
import Scanner from "@/components/scannerTab/Scanner.vue";
import ShopTab from "@/components/shopTab/ShopTab.vue";
import TrackerTab from "@/components/trackerTab/TrackerTab.vue";

import {ref} from "vue";
import Profile from "@/components/ProfileViewer.vue";



const selectedTab = ref("Scanner")
const componentMap = {
  Scanner:Scanner,
  Tracker:TrackerTab,
  Statistics:HealthProfile,
  Shop:ShopTab
};

function handleNavigationClick(tab) {
  selectedTab.value = tab;
}
</script>

<template>
  <profile/>
  <header>
    <TheHeader @navigation-click="handleNavigationClick" @logo-click="handleNavigationClick"/>
  </header>
  <main>
    <component :is="componentMap[selectedTab]"/>
  </main>
</template>

<style scoped>
*{
  font-family: system-ui, sans-serif;
}
header {
  margin-bottom: 2rem;
}
</style>
