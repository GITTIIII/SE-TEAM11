import { PortOriginInterface } from "./IPortOrigin";
import { PortDestinationInterface } from "./IPortDestination";
import { DistanceInterface } from "./IDistance";

export interface DestinationInterface {
  ID?: number;
  Destination_Img?: string;

  PortOriginID?: number;
  PortOrigin?: PortOriginInterface;

  PortDestinationID?: number;
  PortDestinaton?: PortDestinationInterface;

  DistanceID?: number;
  Distance?: DistanceInterface;
}
