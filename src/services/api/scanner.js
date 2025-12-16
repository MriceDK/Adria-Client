import {API_BASE} from "./config.js";

async function getRandomFood(adrianId) {
    return await fetch(`${API_BASE}Scanner/scanfood/${adrianId}`, {
        method: 'POST',
    }).then(response => response.json());
}

async function deleteScan(scanId) {
    return await fetch(`${API_BASE}Scanner/scanfood/scan/${scanId}`, {
        method: 'DELETE',
    });
}

export { getRandomFood, deleteScan };