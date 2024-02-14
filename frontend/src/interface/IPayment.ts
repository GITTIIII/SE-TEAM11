import { BookPlanInterface } from "./IBookPlan";

export interface PaymentInterface {
    ID?: number;
    Price?: number;
    Payment_img?: string;
    Status?: string;
    CreatedAt?: Date

    BookPlanID?: number;
    BookPlan?: BookPlanInterface;
}