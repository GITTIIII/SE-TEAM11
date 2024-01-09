import {PlannerInterface} from "./IPlanner";
import { TouristInterface } from "./ITourist";
import { ActivityInterface } from "./IActivity";

export interface BookActivityInterface {
    ID?: number;
    TimeStart?: Date;
    TimeEnd?: Date;
    NumberOfPeople?: number;
    Comment?: string;
    Phone_number?: string;

    PlannerID?: number;
    Planner?: PlannerInterface;

    TouristID?: number;
    Tourist?: TouristInterface;
    
    ActivityID?: number;
    Activity?: ActivityInterface; 
}