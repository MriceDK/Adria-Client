const API_BASE = "http://localhost:8000";

export async function getUserStats(userId) {
    const res = await fetch(`${API_BASE}/api/analyses/user/${userId}/stats`);
    return await res.json();
}

export async function postUserStats(userId, stats) {
    const payload = {
        userId,
        details: stats.map(s => ({
            bodyStatId: s.bodyStatId,
            value: Number(s.current)
        }))
    };

    await fetch(`${API_BASE}/api/analyses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}