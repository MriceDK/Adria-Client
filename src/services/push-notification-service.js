import {USER_ID} from "@/services/api/config.js";

const VAPID_PUBLIC_KEY = "BL2jmCKm9V1LvSdLaBx6xd37IjmFgEQBmvo-VIUz4RoDilAAokOPb8n6IcRdFb8V6sTNMz-2UFMHJ2FxUFhLO7g\n";
// private key QWwQ7eF5KpuS5z_JP7JSBRyxAaoLa3ubpJPTNwvnGa0

const subscripteOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
}

async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            return registration;
        } catch (error) {
        }
    } else {
    }
}
async function enablePushNotifications() {
    await registerServiceWorker();

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        await renewPushNotification();
    } else {
    }
}

async function renewPushNotification() {
    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });

    postSubscriptionToServer(subscription);
}
function postSubscriptionToServer(subscription) {

    fetch("http://localhost:8000/subscribe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: USER_ID,
            subscription: subscription
        })
    });


}
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export { enablePushNotifications };