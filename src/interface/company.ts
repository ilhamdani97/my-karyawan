
export interface GetDepartmentResoponse {
    data: GetDataDepartmentResponse[]
    isError: boolean;
    message: string;
    totalPages: number;
}
export interface GetDataDepartmentResponse {
    id : number
    departmentCode: string
    departmentName: string
    company: string
    companyId: string
    createdBy: string
    createdAt: Date
    updatedBy: string
    updatedDate: Date
}

export interface GetLeaveTypeResponse {
    data: GetDataLeaveTypeResponse[];
    isError: boolean;
    message: string;
    totalPages: number;
}
export interface GetDataLeaveTypeResponse {
    id : number
    onleaveCode: string
    onleaveName: string
    unit: string
    total: number
    company: string
    companyId: string
    createdBy: string
    createdAt: Date
    updatedBy: string
    updatedDate: Date
}

export interface GetDataEmployees {
    data: GetDataEmployee[];
    isError: boolean;
    message: string;
    totalPages: number;
}

export interface GetDataEmployee {
    id: number
    employeeId: string
    employeeName: string
    departmentCode: string
    departmentName:string
    positionCode: string
    positionName: string
    employeeTypeCode: string
    employeeTypeName: string
    companyCode: string
    companyName: string
    pic: string
    gender: string
    birthday: Date;
    phoneNumber: string
    address: string
    postalCode: string
    national: string
    religion: string
    emailAddress: string
    bankName: string
    bankAccount: string
    paymentMethod: string
    bpjsEmployeeNo: string
    bpjsEmployeeStartPay: Date
    bpjsEmployeeEndPay: Date
    bpjsHealthCareNo: string
    bpjsHealthCareStartPay: Date
    bpjsHealthCareEndPay: Date
    npwpNo: string
    taxStartPay: Date
    taxEndPay: Date
    profilePhoto: string
    workTypeId: string
    workTypeName: string
    areaCode: string 
    areaName: string
    isResign: boolean
    joinDate: Date
    resignDate: Date
    effectiveStart: Date
    effectiveEnd: Date
    accountTypeId: number
    createdBy: string
    createdAt: Date
    updatedBy: string
    updatedAt: Date
}

export interface GetWorkshopResoponse {
    data: GetDataWorkshopResponse[];
    isError: boolean;
    message: string;
    totalPages: number;
}

export interface GetDataWorkshopResponse {
    id : number;
    workshopCode: string,
    workshopName: string,
    company: string;
    companyId: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedDate: Date;
}

export interface GetDataSubscribe{
    companyId: string,
    companyName: string,
    deviceTotal: number,
    deviceUsed: number,
    appsTotal: number,
    appsUsed: number,
    companyStartSubcribe: string,
    companyExpiredSubcribe: string,
    createdBy?: string,
    createdAt?: string,
    updatedBy?: string,
    updatedAt?: string
}

export interface GetDatasSubscribe{
    data: GetDataSubscribe[]
    isError: boolean
    message: string
}
export interface GetDataPositionResponse {
    id : number;
    positionCode: string;
    positionName: string;
    company: string;
    companyId: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedDate: Date;
    departmentName: string;
    departmentCode: string;
}

export interface GetPositionResponse {
    data: GetDataPositionResponse[];
    isError: boolean;
    message: string;
    totalPages: number;
}
