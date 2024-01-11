import {BookPlanInterface} from "./IBookPlan";
import { TouristInterface } from "./ITourist";
import { ActivityInterface } from "./IActivity";

export interface BookActivityInterface {
    ID?: number;
    TimeStart?: Date;
    TimeEnd?: Date;
    NumberOfPeople?: number;
    Comment?: string;
    Phone_number?: string;

    BookPlanID?: number;
    BookPlan?: BookPlanInterface;

    TouristID?: number;
    Tourist?: TouristInterface;
    
    ActivityID?: number;
    Activity?: ActivityInterface; 
}