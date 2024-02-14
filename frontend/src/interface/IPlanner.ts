import { DestinationInterface } from "./IDestination";
import { EmployeeInterface } from "./IEmployee";
import { QuayInterface } from "./IQuay";

export interface PlannerInterface {
  ID?: number;
  Plan_name?: string;
  Plan_price?: number;
  TimeStart?: Date;
  Plan_img?: string;
  Planner_status?: string;

  DestinationID?: number;
  Destination?: DestinationInterface;
  EmployeeID?: number;
  Employee?: EmployeeInterface;
  QuayID?: number;
  Quay?: QuayInterface;
}
