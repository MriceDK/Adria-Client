import { STAT_IDS } from "@/services/api/helpers/statIds.js";
import {
    BODY_STAT_TARGET_MIN,
    BODY_STATS,
    CHOLESTEROL,
    DAILY_GOALS,
    MINERALS,
    TRACKER
} from "@/services/api/helpers/stats.js";

export function filterDailyGoals(data) {
    return data
        .filter(item => DAILY_GOALS.includes(item.label))
        .sort((a, b) => DAILY_GOALS.indexOf(a.label) - DAILY_GOALS.indexOf(b.label))
        .map(item => ({
            label: item.label,
            current: item.current,
            goal: item.goal,
            unit: item.unit,
            bodyStatId: STAT_IDS[item.label]
        }));
}

export function filterMinerals(data) {
    return data
        .filter(item => MINERALS.includes(item.label))
        .sort((a, b) => MINERALS.indexOf(a.label) - MINERALS.indexOf(b.label))
        .map(item => ({
            label: item.label,
            current: item.current,
            goal: item.goal,
            unit: item.unit,
            bodyStatId: STAT_IDS[item.label]
        }));
}

export function filterBodyStats(data) {
    return data
        .filter(item => BODY_STATS.includes(item.label))
        .sort((a, b) => BODY_STATS.indexOf(a.label) - BODY_STATS.indexOf(b.label))
        .map(item => ({
            label: item.label,
            current: item.current,
            goal: item.goal,
            unit: item.unit,
            targetMin: BODY_STAT_TARGET_MIN[item.label],
            bodyStatId: STAT_IDS[item.label]
        }));
}

export function filterCholesterol(data) {
    return data
        .filter(item => CHOLESTEROL.includes(item.label))
        .sort((a, b) => CHOLESTEROL.indexOf(a.label) - CHOLESTEROL.indexOf(b.label))
        .map(item => ({
            label: item.label
                .replace(" Cholesterol", "")
                .replace("Cholesterol ", ""),
            current: item.current,
            goal: item.goal,
            unit: item.unit,
            bodyStatId: STAT_IDS[item.label]
        }));
}

export function filterTrackerData(data) {
    return data
        .filter(item => TRACKER.includes(item.label))
        .sort((a, b) => TRACKER.indexOf(a.label) - TRACKER.indexOf(b.label))
        .map(item => ({
            label: item.label,
            current: item.current,
            goal: item.goal,
            unit: item.unit,
            bodyStatId: STAT_IDS[item.label]
        }));
}
