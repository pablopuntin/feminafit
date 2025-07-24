    export enum AppoinmentStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled"
}


interface IAppoinment{
id: number;
date: string;
time: string;
status: AppoinmentStatus;
description: string;
userId: number;
}

export  default IAppoinment;