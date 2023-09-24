import { API_BASE_URL } from "@/utils/listApi/baseUrl"

export const onleave = {
    getDataOnleave: (companyID: string) => `${API_BASE_URL}onleave/getonleave/${companyID}`
}