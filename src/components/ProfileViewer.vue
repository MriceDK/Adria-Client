<script setup>
import User from "../components/icons/User.vue";
import {ref} from "vue";
import {enablePushNotifications} from "../services/push-notification-service.js";
import MainButton from "../components/utilities/MainButton.vue";
import {getOrderHistory, getProfile} from "@/services/api/profile.js";
import {USER_ID} from "@/services/api/config.js";
import Order from "@/components/Order.vue";

const profileOpen = ref(false);
const userData = ref(null);
const userOrderHistory = ref(null);

async function openProfilePopup() {
  userData.value = await getProfile(USER_ID);
  userOrderHistory.value = await getOrderHistory(USER_ID);
  console.log(userOrderHistory.value);
  profileOpen.value = true;
}

function enablePush() {
  enablePushNotifications();
}
</script>

<template>
  <user v-if="!profileOpen" class="user-icon" @click="openProfilePopup"/>

  <div v-if="profileOpen" class="backgroundShadow" @click="profileOpen = false"/>
  <div v-if="profileOpen" class="popup">
    <div class="top-row">
      <p class="title">Profile</p>
      <p @click="profileOpen = false;" class="close">X</p>
    </div>
    <p class="subtitle">View your profile information and order history</p>
    <div class="profile-card">
      <user class="profile-avatar" alt="User avatar"/>
      <div class="profile-info">
        <p class="profile-name">{{ userData.name }}</p>
        <p class="profile-id">{{ userData.id }}</p>
        <p class="profile-date">
          <svg class="calendar-icon" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!--Keep Here Because color change-->
            <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="var(--secondary-text-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Subscribed since <span class="subscription-start-date">Jan 15, 2024</span>
        </p>
      </div>
    </div>
    <div class="profile-card push-notis">
      <p class="title">Push notifications</p>
      <main-button @click="enablePush">Enable Notifications</main-button>
    </div>
    <div class="profile-card subscription">
      <div class="subscription-info">
        <p>Subscription plan</p>
        <div class="subscription-type">
          <img src="../assets/icons/crown-icon.svg" class="subscription-icon" alt="crown-icon">
          <p class="subscription-plan">{{ userData.subscriptionType}}</p>

        </div>
      </div>
      <p class="subscription-tag">Premium</p>
    </div>
    <div class="order-history">
      <p class="section-title">Order History</p>
      <ul class="profile-card order-history">
        <Order class="order-history-item" v-for="order in userOrderHistory" :key="order.id" :order="order"/>
      </ul>
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
  z-index: 4;

  width: 3%;
  height: 3%;
  border: 2px solid var(--secondary-bg-color);
  border-radius: 0.35rem;
  box-shadow: 0.1rem 0.1rem 0.1rem var(--secondary-bg-color);
  padding: 0.25rem;

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
  background: var(--main-bg-color);
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(20,30,50,0.08);
  padding: 1.25rem 1.5rem;
  max-width: 25rem;
  font-family: var(--main-font-family), sans-serif;
  margin-bottom: 1.5rem;
}

.title {
  font-family: var(--main-font-family), sans-serif;
  color: var(--main-text-color);
  font-size: 1.15rem;
  font-weight: 600;
  margin: 1rem 0 0.25rem;
}

.subtitle {
  font-family: var(--main-font-family), sans-serif;
  color: var(--secondary-text-color);
  font-size: 1rem;
  margin: 0 0 1.5rem;

}

.profile-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1.25rem;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.profile-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--main-text-color);
  margin: 0;
}

.profile-id {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 70%;

  font-size: 1rem;
  color: var(--secondary-text-color);
  margin: 0;
}

.profile-date {
  font-size: 0.98rem;
  color: var(--secondary-text-color);
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin: 0;
}

.profile-date .calendar-icon {
  width: 1.125rem;
  height: 1.125rem;
  color: var(--secondary-text-color);
}

.profile-card.subscription {
  display: flex;
  flex-flow: row nowrap;
  gap: 0.25rem;
  justify-content: space-between;
  align-items: center;
}

.subscription-info {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 0;
}

.subscription-type {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.75rem;
  padding: 0.625rem 0 0.375rem;
}

.subscription-type .subscription-icon {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
}

.subscription-plan {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}

.subscription-tag {
  margin: 0;
  padding: 0.125rem 0.625rem;
  border-radius: 999px;
  background-color: var(--main-blue-color);
  color: var(--main-bg-color);
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
}

.close {
  cursor: pointer;
}

.close:hover {
  color: var(--secondary-text-color);
}

.push-notis {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

}

.order-history {
  display: flex;
  flex-flow: column nowrap;

  border-radius: 0.75rem;
  list-style: none;
  margin: 0;
  gap: 0.75rem;
}

.profile-card.order-history {
  overflow: scroll;
  max-height: 10rem;
}

.order-history-item {
  border-radius: 0.35rem;
  box-shadow: 0.1rem 0.1rem 0.1rem var(--secondary-bg-color);
  padding: 1rem;
}

.order-history .section-title {
  font-family: var(--main-font-family), sans-serif;
  color: var(--main-text-color);
  font-size: 1.15rem;
  font-weight: 600;
  margin: 1rem 0 0.75rem;
}

</style>