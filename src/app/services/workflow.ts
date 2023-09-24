import { API, axiosRequest } from "@/utils/api";

export async function getPositionByDepartment(payload: any) {

    const response = await axiosRequest({
        url: API.workflow.getPositionByDepartment(payload),
        method: 'GET',
        payload
    })

    return response?.data || null;
}