import { BookPlanInterface } from "./IBookPlan";

export interface CheckInInterface {
    ID?: number;
    CheckIn_date?: Date;

    BookPlanID?: number;
    BookPlan?: BookPlanInterface;
}