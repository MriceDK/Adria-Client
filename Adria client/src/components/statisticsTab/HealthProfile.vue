<script setup>

import DailyIntakeGoalsStatistics from "@/components/statisticsTab/DailyIntakeGoalsStatistics.vue";
import MineralsStatistics from "@/components/statisticsTab/MineralsStatistics.vue";
</script>

<template>
  <main>
    <div id="profile-header">
      <h1>Health Profile</h1>
      <p>Track and manage your health statistics</p>
    </div>
    <div class="statistics">
      <DailyIntakeGoalsStatistics />
    </div>
    <div class="statistics">
      <MineralsStatistics />
    </div>
  </main>
</template>

<style scoped>

main {
  max-width: 80%;
  margin: auto;
  font-family: system-ui, sans-serif;
}

.statistics {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

#profile-header h1{
  font-size: 3rem;
  color: black;
  margin: 0;
}

#profile-header p {
  color: dimgray;
  margin: 0;
}

</style>