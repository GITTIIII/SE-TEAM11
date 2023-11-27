import { DestinationInterface } from "./IDestination";

export interface PlannerInterface {
    ID?: number;
    Plan_name?: string;
    Price?: number;
    Plan_time?: string;
    Plan_date?: string;

    DestinationID?: number;
    Destination?: DestinationInterface;
}