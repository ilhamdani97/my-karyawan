import { API, axiosRequest } from "@/utils/api";

interface PropsPostPayroll {
    positionId: string;
    properties: object;
}

export async function postDataPayroll(payload: PropsPostPayroll) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.payroll.payroll,
        payload,
    });

    return response?.data || null;
}

export async function getDataPayroll () {
    const response = await axiosRequest({
        method: 'GET',
        url: API.payroll.payroll
    });

    return response?.data || null;
}

export async function deleteDataPayroll(id: string) {
    const response = await axiosRequest({
        method: 'DELETE',
        url: API.payroll.deletePayroll(id),
    })

    return response?.data || null;
}

export async function updateDataPayroll(id:string, payload: any) {
    const response = await axiosRequest({
        method: 'PUT',
        url: API.payroll.updateDataArea(id),
        payload
    })

    return response?.data || null;
}