import { API_BASE_URL } from "@/utils/listApi/baseUrl"

export const workshop = {
    getDataWorkshop: (companyID: string) => `${API_BASE_URL}workshop/getworkshop/${companyID}`
}