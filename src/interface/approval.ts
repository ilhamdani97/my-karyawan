
export interface GetOnleaveResponse {
    data: GetDataOnleaveResponse[];
    isError: boolean;
    message: string;
}
export interface GetDataOnleaveResponse {
    id : number
    onLeaveCode: string
    onLeaveName: string
    unit: string
    total: number
    company: string
    companyId: string,
    createdBy: string,
    createdAt: Date,
    updatedBy: string,
    updatedDate: Date
}

export interface GetWorkshopResponse {
    data: GetDataWorkshopResponse[];
    isError: boolean;
    message: string;
}

export interface GetDataWorkshopResponse {
    id: string
    workshopCode: string
    workshopName: string
    unit: string
    total: number
    startDate: Date
    endDate: Date
    startTime: string
    endTime: string
    company: string
    companyId: string
    createdBy: string
    createdAt: Date
    updatedBy: string
    updatedDate: Date
}