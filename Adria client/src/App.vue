<script setup>
import TheHeader from "@/components/TheHeader.vue";
import DailyIntakeGoals from "@/components/DailyIntakeGoals.vue";
import HealthProfile from "@/components/HealthProfile.vue";
import ShopItem from "@/components/ShopItem.vue";
</script>

<template>
  <main>
    <TheHeader />
    <HealthProfile />
    <ShopItem image=".\src\assets\icons\statsicon.png" />
    <ShopItem image=".\src\assets\icons\trackerIcon.png"/>
    <ShopItem image=".\src\assets\icons\statsicon.png"/>
    <ShopItem image=".\src\assets\icons\img.png" />
    <ShopItem image=".\src\assets\icons\trackerIcon.png"/>
    <ShopItem image=".\src\assets\icons\img_1.png"/>
  </main>
</template>

<style scoped>

</style>
