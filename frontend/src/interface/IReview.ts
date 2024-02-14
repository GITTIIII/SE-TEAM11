import { TouristInterface } from "./ITourist";
import { PlannerInterface } from "./IPlanner";

export interface ReviewInterface {
    ID?: number;
    Comment?: String;

    TouristID?: number;
    Tourist?: TouristInterface;

    PlannerID?: number;
    Planner?: PlannerInterface;
}