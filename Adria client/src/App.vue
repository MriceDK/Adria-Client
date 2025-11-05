<script setup>
import TheHeader from "@/components/TheHeader.vue";
import DailyIntakeGoals from "@/components/DailyIntakeGoals.vue";
import HealthProfile from "@/components/HealthProfile.vue";
import ShopItem from "@/components/ShopItem.vue";
const dummydata ={
  title: "banaan",
  description: 'een fruit',
  cost: 5
}
</script>

<template>
  <main>
    <TheHeader />
    <HealthProfile />
    <ShopItem :item="dummydata" image=".\src\assets\icons\img.png"  />
    <ShopItem :item="dummydata" image=".\src\assets\icons\img.png"  />
    <ShopItem :item="dummydata" image=".\src\assets\icons\img.png"  />
  </main>
</template>

<style scoped>
*{
  font-family: system-ui, sans-serif;
}
</style>
