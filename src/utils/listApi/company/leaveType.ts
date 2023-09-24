import { API_BASE_URL } from "@/utils/listApi/baseUrl";

export const leaveType = {
    getDataLeaveTypePagination: () => `${API_BASE_URL}/onleave/getPagination`,
    getDataLeaveType: () => `${API_BASE_URL}/onleave/getonleave`,
    postDataLeaveType: `${API_BASE_URL}/onleave/addonleave`,
    updateDataLeaveType: (id: string) => `${API_BASE_URL}/onleave/${id}`,
    deleteDataLeaveType: (id: string) => `${API_BASE_URL}/onleave/${id}`,
    exportDataLeaveType: () => `${API_BASE_URL}/onleave/export`,
}