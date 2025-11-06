<script setup>
import TheHeader from "@/components/TheHeader.vue";
import HealthProfile from "@/components/HealthProfile.vue";
import Scanner from "@/components/Scanner.vue";
import ShopTab from "@/components/ShopTab.vue";
import {ref} from "vue";
import ShoppingCart from "@/components/shoptab/ShoppingCart.vue";


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
  <header>
    <TheHeader @navigation-click="handleNavigationClick"></TheHeader>
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
