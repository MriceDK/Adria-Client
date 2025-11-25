import { ref } from "vue";
import { getUserStats } from "@/services/statsService.js";

const stats = ref(null);
const loaded = ref(false);

export async function useStats() {
    if (!loaded.value) {
        stats.value = await getUserStats("d4e5f6a7-b8c9-4d5e-1f2a-4b5c6d7e8f9a");
        loaded.value = true;
    }
    return { stats };
}