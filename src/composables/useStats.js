import { getUserStats } from "@/services/statsService.js";
import { filterDailyGoals, filterMinerals, filterBodyStats, filterCholesterol } from "@/helpers/statsFilters.js";

export async function useStats(type) {
    const data = await getUserStats("d4e5f6a7-b8c9-4d5e-1f2a-4b5c6d7e8f9a");

    if (type === "daily") {
        return filterDailyGoals(data);
    }

    if (type === "minerals") {
        return filterMinerals(data);
    }

    if (type === "body") {
        return filterBodyStats(data);
    }

    if (type === "cholesterol") {
        return filterCholesterol(data);
    }

    return data;
}
