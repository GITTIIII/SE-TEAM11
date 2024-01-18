import { DestinationInterface } from "./IDestination";

export interface PlannerInterface {
  ID?: number;
  Plan_name?: string;
  Price?: number;
  TimeStart?: Date;
  TimeEnd?: Date;
  Plan_img?: string;

  DestinationID?: number;
  Destination?: DestinationInterface;
}
