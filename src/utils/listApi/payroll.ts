import { API_BASE_URL } from "./baseUrl";

export const payroll = {
    payroll: `${API_BASE_URL}/payrolls`,
    deletePayroll: (id: string) => `${API_BASE_URL}/payrolls/${id}`,
    updateDataArea: (id: string) => `${API_BASE_URL}/payrolls/${id}`,
}