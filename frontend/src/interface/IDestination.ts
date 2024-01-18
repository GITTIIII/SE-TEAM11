import { PortOriginInterface } from "./IPortOrigin";
import { PortDestinationInterface } from "./IPortDestination";
import { DistanceInterface } from "./IDistance";

export interface DestinationInterface {
  ID?: number;
  Destination_img?: string;
  Destination_name?: string;
  Destination_price?: number;
  PortOriginID?: number;
  PortOrigin?: PortOriginInterface;

  PortDestinationID?: number;
  PortDestinaton?: PortDestinationInterface;

  DistanceID?: number;
  Distance?: DistanceInterface;
}
