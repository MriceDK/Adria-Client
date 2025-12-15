import {API_BASE} from "@/services/api/config.js";

async function getRandomFood(adrianId) {
    return await fetch(`${API_BASE}Scanner/scanfood/${adrianId}`, {
        method: 'POST',
    }).then(response => response.json());
}

export { getRandomFood };