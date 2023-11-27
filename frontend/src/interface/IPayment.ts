import { BookPlanInterface } from "./IBookPlan";

export interface PaymentInterface {
    ID?: number;
    Price?: number;
    Payment_img?: string;

    BookPlanID?: number;
    BookPlan?: BookPlanInterface;
}