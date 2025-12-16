import { getUserStats } from "@/services/api/stats.js";
import {
    filterDailyGoals,
    filterMinerals,
    filterBodyStats,
    filterCholesterol,
    filterTrackerData
} from "@/services/api/helpers/statsFilters.js";
import {USER_ID} from "@/services/api/config.js";

export async function useStats(type) {
    const data = await getUserStats(USER_ID);

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

    if (type === "tracker-data") {
        return filterTrackerData(data);
    }

    return data;
}
