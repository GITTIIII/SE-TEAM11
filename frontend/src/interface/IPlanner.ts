import { DestinationInterface } from "./IDestination";

export interface PlannerInterface {
  ID?: number;
  Plan_name?: string;
  Price?: number;

  DestinationID?: number;
  Destination?: DestinationInterface;
}
