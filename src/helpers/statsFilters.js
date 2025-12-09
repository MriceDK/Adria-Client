import {STAT_IDS} from "@/helpers/statIds.js";

export function filterDailyGoals(data) {
    const needed = ["Protein", "Carbohydrates", "Fats", "Water"];

    return data
        .filter(item => needed.includes(item.label))
        .sort((a, b) => needed.indexOf(a.label) - needed.indexOf(b.label))
        .map(item => ({
            label: item.label,
            current: toNumber(item.current),
            goal: toNumber(item.goal),
            unit: item.unit,
            bodyStatId: STAT_IDS[item.label]
        }));
}


export function filterMinerals(data) {
    const needed = [
        "Calcium", "Iron", "Magnesium", "Phosphorus", "Potassium",
        "Sodium", "Zinc", "Copper", "Manganese", "Selenium", "Iodine"
    ];
    return data
        .filter(item => needed.includes(item.label))
        .sort((a, b) => needed.indexOf(a.label) - needed.indexOf(b.label))
        .map(item => ({
            label: item.label,
            current: toNumber(item.current),
            goal: toNumber(item.goal),
            unit: item.unit,
            bodyStatId: STAT_IDS[item.label]
        }));
}

export function filterBodyStats(data) {
    const needed = [
        "Body Fat",
        "BMI",
        "Blood Pressure",
        "Resting Heart Rate",
        "Fasting Blood Glucose",
        "Hydration"
    ];

    const targetMin = {
        "Body Fat": 10,
        "BMI": 18.5,
        "Blood Pressure": 80,
        "Resting Heart Rate": 60,
        "Fasting Blood Glucose": 70,
        "Hydration": 100
    };

    return data
        .filter(item => needed.includes(item.label))
        .sort((a, b) => needed.indexOf(a.label) - needed.indexOf(b.label))
        .map(item => ({
            label: item.label,
            current: toNumber(item.current),
            goal: toNumber(item.goal),
            unit: item.unit,
            targetMin: targetMin[item.label],
            bodyStatId: STAT_IDS[item.label]
        }));
}

export function filterCholesterol(data) {
    const needed = [
        "Cholesterol Total",
        "HDL Cholesterol",
        "LDL Cholesterol",
        "Triglycerides"
    ];

    return data
        .filter(item => needed.includes(item.label))
        .sort((a, b) => needed.indexOf(a.label) - needed.indexOf(b.label))
        .map(item => ({
            label: item.label
                .replace(" Cholesterol", "")
                .replace("Cholesterol ", ""),
            current: toNumber(item.current),
            goal: toNumber(item.goal),
            unit: item.unit,
            bodyStatId: STAT_IDS[item.label]
        }));
}

function toNumber(value) {
    const cleaned = String(value).replace(/[^0-9.]/g, "");
    return parseFloat(cleaned);
}