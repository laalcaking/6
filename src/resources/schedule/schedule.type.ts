export interface TSchedule {
    productID: string;
    isActive: boolean;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface TScheduleModel extends TSchedule {
    id: string;
} 

export interface TScheduleResponse extends Omit<TSchedule, ''> {
    id:string;
}