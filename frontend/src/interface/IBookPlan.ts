import {PlannerInterface} from "./IPlanner";
import { TouristInterface } from "./ITourist";
import {RoomInterface} from "./IRoom";
import {FoodSetInterface} from "./IFoodSet";

export interface BookPlanInterface {
    ID?: number;
    
    PlannerID?: number;
    Planner?: PlannerInterface;

    TouristID?: number;
    Tourist?: TouristInterface;

    RoomID?: number;
    Room?: RoomInterface;

    FoodSetID?: number;
    FoodSet?: FoodSetInterface; 
}