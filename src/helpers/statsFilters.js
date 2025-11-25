export function filterDailyGoals(data) {
    const needed = ["Protein", "Carbohydrates", "Fats", "Water"];
    return data.filter(x => needed.includes(x.label));
}

export function filterMinerals(data) {
    const list = [
        "Calcium", "Iron", "Magnesium", "Phosphorus", "Potassium",
        "Sodium", "Zinc", "Copper", "Manganese", "Selenium", "Iodine"
    ];
    return data.filter(s => list.includes(s.label));
}

export function filterBodyStats(data) {
    const names = [
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
        "Blood Pressure": 0,
        "Resting Heart Rate": 60,
        "Fasting Blood Glucose": 70,
        "Hydration": 100
    };

    return data
        .filter(stat => names.includes(stat.label))
        .map(stat => ({
            label: stat.label,
            current: stat.current,
            goal: stat.goal,
            unit: stat.unit,
            targetMin: targetMin[stat.label]
        }));
}

export function filterCholesterol(data) {
    const needed = [
        "HDL Cholesterol",
        "LDL Cholesterol",
        "Cholesterol Total",
        "Triglycerides"
    ];

    return data
        .filter(item => needed.includes(item.label))
        .map(item => ({
            label: item.label.replace(" Cholesterol", ""),
            current: item.current,
            goal: item.goal,
            unit: item.unit
        }));
}