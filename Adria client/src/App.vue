<script setup>
import TheHeader from "@/components/TheHeader.vue";
import HealthProfile from "@/components/statisticsTab/HealthProfile.vue";
import Scanner from "@/components/scannerTab/Scanner.vue";
import ShopTab from "@/components/shopTab/ShopTab.vue";
import {ref} from "vue";


const selectedTab = ref("Scanner")
const componentMap = {
  Scanner:Scanner,
  Tracker:ShopTab,
  Statistics:HealthProfile,
  Shop:ShopTab
};

function handleNavigationClick(tab) {
  selectedTab.value = tab;
}
</script>

<template>
  <header>
    <TheHeader @navigation-click="handleNavigationClick" @logo-click="handleNavigationClick"></TheHeader>
  </header>
  <main>
    <component :is="componentMap[selectedTab]"> </component>
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
