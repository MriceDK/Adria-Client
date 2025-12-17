import {API_BASE} from "./config.js";

async function getProfile(adrianId) {
    return await fetch(`${API_BASE}users/${adrianId}`, {
        method: 'GET',
    }).then(response => response.json());
}

async function getOrderHistory(adrianId) {
    return await fetch(`${API_BASE}order/user/${adrianId}`, {
        method: 'GET',
    }).then(response => response.json());
}

export { getProfile, getOrderHistory };