import {API_BASE} from "./config.js";

async function getShopItems() {
    return await fetch(`${API_BASE}supplement/all`, {
        method: 'GET',
    }).then(response => response.json());
}

export { getShopItems };