<script setup>
import User from "@/components/icons/User.vue";
import {ref} from "vue";

let profileOpen = ref(false);
function openProfilePopup() {
//   TODO: Add network requests to server
  profileOpen.value = true;
}
</script>

<template>
  <user v-if="!profileOpen" class="user-icon" @click="openProfilePopup"/>

  <div v-if="profileOpen" class="backgroundShadow" @click="profileOpen = false"/>
  <div v-if="profileOpen" class="popup">
    <div class="top-row">
      <p class="title">Profile</p>
      <p @click="profileOpen = false;">X</p>
    </div>
    <p class="subtitle">View your profile information and order history</p>
    <div class="profile-card">
      <user class="profile-avatar" alt="User avatar"/>
      <div class="profile-info">
        <p class="profile-name">Sarah Johnson</p>
        <p class="profile-email">sarah.johnson@email.com</p>
        <p class="profile-date">
          <span class="calendar-icon">📅</span>
          Member since Jan 15, 2024
        </p>
      </div>
    </div>
    <div class="subscription">

    </div>
    <div class="order-history">

    </div>
  </div>
</template>

<style scoped>

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98%;
}

.user-icon {
  position: sticky;
  float: right;
  margin-right: .25%;
  top: 1%;
  z-index: 10;

  width: 2%;
  height: 2%;
  border: 2px solid var(--secondary-bg-color);
  border-radius: 0.35rem;
  box-shadow: 0.1rem 0.1rem 0.1rem var(--secondary-bg-color);
}

.profile {
  display: grid;
  justify-content: right;
  align-items: center;
  width: 100%;
  border-top: 2px solid var(--secondary-bg-color);
  border-bottom: 2px solid var(--secondary-bg-color);

}

.profile-icon {

  grid-area: icon;
  height: 50%;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid var(--secondary-bg-color);
  border-radius: 100%;
}

.username {
  grid-area: username;
  font-weight: 600;
  font-size: 1.1rem;
}

.adrian-id {
  grid-area: adrian-id;
  color: var(--secondary-text-color);
}

.popup {
  z-index: 5;
  position: fixed;
  width: 33%;
  height: 100vh;
  right: 0;
  top: 0;
  background-color: var(--main-bg-color);
  padding-left: 1rem;
  padding-right: 1rem;

  font-family: var(--main-font-family), sans-serif;
}

.backgroundShadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--main-text-color);
  opacity: 0.5;
  z-index: 4;
}


.profile-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(20,30,50,0.08);
  padding: 20px 24px;
  max-width: 400px;
  font-family: 'Segoe UI', 'Arial', sans-serif;
}

.profile-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #222;
  margin: 0;
}

.profile-email {
  font-size: 1rem;
  color: #757575;
  margin: 0;
}

.profile-date {
  font-size: 0.98rem;
  color: #8c8c8c;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
}

/* Optional: calendar icon styling if inline SVG or icon font used */
.profile-date .calendar-icon {
  width: 18px;
  height: 18px;
  color: #8c8c8c;
}

</style>