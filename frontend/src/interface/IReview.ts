import { TouristInterface } from "./ITourist";
import { PlannerInterface } from "./IPlanner";

export interface ReviewInterface {
    ID?: number;
    Comment?: string;

    TouristID?: number;
    Tourist?: TouristInterface;

    PlannerID?: number;
    Planner?: PlannerInterface;
}