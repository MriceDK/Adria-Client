export async function getUserStats(userId) {
    const res = await fetch(`http://localhost:8000/api/analyses/user/${userId}/stats`);
    return await res.json();
}
