import {API_BASE} from "./config.js";

async function getShopItems() {
    return await fetch(`${API_BASE}supplement/all`, {
        method: 'GET',
    }).then(response => response.json());
}

async function createOrder(adrianId, orderData) {
    const body =  {
        adrianId: adrianId,
        supplements: orderData,
    };

    return await fetch(`${API_BASE}OrderSupplement`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

export { getShopItems, createOrder };