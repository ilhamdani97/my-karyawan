
import { API, axiosRequest } from "@/utils/api";
import { downloadFile } from "@/utils/general";

interface PropsPostEmployee {
    employeeId: string;
    employeeName: string;
    departmentCode: string;
    departmentName: string;
    positionCode: string;
    positionName: string;
    employeeTypeCode?: string;
    employeeTypeName?: string;
    companyCode?: string;
    companyName?: string;
    pic?: string;
    gender: string;
    birthday: string;
    phoneNumber: string;
    address: string;
    postalCode?: string;
    national: string;
    religion: string;
    emailAddress: string;
    bankName?: string;
    bankAccount?: string;
    paymentMethod?: string;
    bpjsEmployeeNo?: string;
    bpjsEmployeeStartPay?: string;
    bpjsEmployeeEndPay?: string;
    bpjsHealthCareNo?: string;
    bpjsHealthCareStartPay?: string;
    bpjsHealthCareEndPay?: string;
    npwpNo?: string;
    taxStartPay?: string;
    taxEndPay?: string;
    profilePhoto?: string;
    workTypeId?: string;
    workTypeName?: string;
    areaCode?: string;
    areaName?: string;
    isResign?: boolean;
    joinDate?: string;
    resignDate?: string;
    effectiveStart?: string;
    effectiveEnd?: string;
    accountTypeId?: number;
    createdBy?: string;
    createdAt?: string;
    updatedBy?: string;
    updatedAt?: string;
}

export async function getDataEmployee() {
    const response = await axiosRequest({
      url: API.company.employee.getDataEmployee(),
      method: "GET",
    });
  
    return response?.data || null;
}

  
  export async function postDataEmployee(payload: PropsPostEmployee) {
    const response = await axiosRequest({
      method: "POST",
      url: API.company.employee.postDataEmployee,
      payload,
    });

    return response?.data || null;
  }

  export async function deleteDataEmployee(id: string) {
    const response = await axiosRequest({
      method: "DELETE",
      url: API.company.employee.deleteDataEmployee(id),
    });
    return response?.data || null;
  }
  
  export async function updateDataEmployee(
    id: string,
    payload: PropsPostEmployee
  ) {
    const response = await axiosRequest({
      method: "PUT",
      url: API.company.employee.updateDataEmployee(id),
      payload: payload,
    });
    return response?.data || null;
  }