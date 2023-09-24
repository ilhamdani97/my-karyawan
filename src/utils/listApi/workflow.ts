import { API_BASE_URL } from "./baseUrl";

export const workflow = {
    getPositionByDepartment: (id: string) => `${API_BASE_URL}/position/getpositionbydepartment/${id}`,
}