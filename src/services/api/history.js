import {API_BASE} from "@/services/api/config.js";

async function getHistory(adrianId) {
    return await fetch(`${API_BASE}Scanner/history/${adrianId}`, {
        method: 'GET',
    }).then(response => response.json());
}

export { getHistory };