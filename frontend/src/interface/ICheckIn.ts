import { BookPlanInterface } from "./IBookPlan";

export interface CheckInInterface {
    ID?: number;
    CheckIn_time?: string;
    CheckIn_date?: string;

    BookPlanID?: number;
    BookPlan?: BookPlanInterface;
}