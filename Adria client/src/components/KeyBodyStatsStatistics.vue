<template>
  <section class="body-stats-section">
    <div class="row">
      <div class="header-left">
        <div class="icon-circle stats-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-heart">
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
          </svg>
        </div>
        <div class="text-block">
          <h2>Key Body Stats</h2>
          <p>Health measurements and vitals</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.body-stats-section {
  background: white;
  border: 0.1rem solid #E5E5E5;
  border-radius: 1rem;
  padding: 2rem;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-circle.stats-icon {
  background-color: #fee2e2;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-circle.stats-icon svg {
  width: 2rem;
  height: 2rem;
  stroke: #ef4444;
}

.text-block h2 {
  font-size: 1.7rem;
  font-weight: bold;
  margin: 0;
}

.text-block p {
  font-size: 1rem;
  color: #717182;
  margin: 0;
}
</style>
