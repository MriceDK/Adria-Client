import {API_BASE} from "@/services/api/config.js";

async function getHistory(adrianId) {
    console.log(fetch(`${API_BASE}Scanner/history/${adrianId}`, {
        method: 'GET',
    }).then(response => response.json()))
    return await fetch(`${API_BASE}Scanner/history/${adrianId}`, {
        method: 'GET',
    }).then(response => response.json());
}

export { getHistory };