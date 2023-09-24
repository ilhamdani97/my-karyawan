import { API, axiosRequest } from "@/utils/api";

export async function getDataWorkshop(companyID: string) {
    const response = await axiosRequest({
        url: API.approval.workshop.getDataWorkshop(companyID),
        method: 'GET'
    })

    return response?.data || null;
}