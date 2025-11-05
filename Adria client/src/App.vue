<script setup>
import TheHeader from "@/components/TheHeader.vue";
import HealthProfile from "@/components/HealthProfile.vue";
import Scanner from "@/components/Scanner.vue";
import ShopTab from "@/components/ShopTab.vue";
import {ref} from "vue";


const selectedTab = ref("scanner")
const componentMap = {
  scanner:ShopTab,
  tracker:ShopTab,
  statistics:ShopTab,
  shop:ShopTab
};

function handleNavigationClick(tab) {
  selectedTab.value = tab;
}
</script>

<template>
  <main>
    <TheHeader></TheHeader>
    <scanner></scanner>
    <TheHeader />
    <HealthProfile />
    <TheHeader @navigation-click="handleNavigationClick"></TheHeader>
    <component :is="componentMap[selectedTab]"> </component>
  </main>
</template>

<style scoped>

</style>
