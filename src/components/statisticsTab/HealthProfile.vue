<script setup>

import DailyIntakeGoalsStatistics from "@/components/statisticsTab/statistics/DailyIntakeGoalsStatistics.vue";
import MineralsStatistics from "@/components/statisticsTab/statistics/MineralsStatistics.vue";
import KeyBodyStatsStatistics from "@/components/statisticsTab/statistics/KeyBodyStatsStatistics.vue";
</script>

<template>
  <main>
    <div id="profile-header">
      <h1>Health Profile</h1>
      <p>Track and manage your health statistics</p>
    </div>
    <section>
      <DailyIntakeGoalsStatistics />
    </section>
    <section>
      <MineralsStatistics />
    </section>
    <section>
      <KeyBodyStatsStatistics />
    </section>
  </main>
</template>

<style scoped>
main {
  max-width: 80%;
  margin: auto;
  font-family: system-ui, sans-serif;
}
section {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

#profile-header {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

#profile-header h1 {
  font-size: 2rem;
  color: var(--main-text-color);
  margin: 0;
}
#profile-header p {
  color: var(--secondary-text-color);
  margin: 0;
  font-size: 1.25rem;
}
</style>
