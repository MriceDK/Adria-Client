<script setup>
import TheHeader from "@/components/TheHeader.vue";
import HealthProfile from "@/components/HealthProfile.vue";
import Scanner from "@/components/Scanner.vue";
import ShopTab from "@/components/ShopTab.vue";
import {ref} from "vue";


const selectedTab = ref("scanner")
const componentMap = {
  scanner:Scanner,
  tracker:ShopTab,
  statistics:HealthProfile,
  shop:ShopTab
};

function handleNavigationClick(tab) {
  selectedTab.value = tab;
}
</script>

<template>
  <main>
    <TheHeader @navigation-click="handleNavigationClick"></TheHeader>
    <component :is="componentMap[selectedTab]"> </component>
  </main>
</template>

<style scoped>

</style>
