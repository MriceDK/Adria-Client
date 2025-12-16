import {API_BASE} from "./config.js";

async function getHistory(adrianId) {
    return await fetch(`${API_BASE}Scanner/history/${adrianId}`, {
        method: 'GET',
    }).then(response => response.json());
}

async function deleteScan(scanId) {
    await fetch(
        `${API_BASE}Scanner/ScanFood/scan/${scanId}`,
        {method: "DELETE"}
    );
}

export { getHistory, deleteScan };