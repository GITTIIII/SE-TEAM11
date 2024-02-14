import { PortOriginInterface } from "./IPortOrigin";
import { PortDestinationInterface } from "./IPortDestination";
import { DistanceInterface } from "./IDistance";
import { EmployeeInterface } from "./IEmployee";

export interface DestinationInterface {
  ID?: number;
  Destination_name?: string;
  Comment?: string;
  Destination_status?: string;

  PortOriginID?: number;
  PortOrigin?: PortOriginInterface;

  PortDestinationID?: number;
  PortDestination?: PortDestinationInterface;

  DistanceID?: number;
  Distance?: DistanceInterface;

  EmployeeID?: number;
  Employee?: EmployeeInterface;
}
