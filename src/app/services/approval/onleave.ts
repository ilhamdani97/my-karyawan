import { API, axiosRequest } from "@/utils/api";

export async function getDataOnleave(companyID: string) {
    const response = await axiosRequest({
        url: API.approval.onleave.getDataOnleave(companyID),
        method: 'GET',
    })

    return response?.data || null;
}