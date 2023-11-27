import {PortOriginInterface} from "./IPortOrigin";
import { PortDestinationInterface } from "./IPortDestination";
import {BaggageInterface} from "./IBaggage";

export interface DestinationInterface {
    ID?: number;
    
    PortOriginID?: number;
    PortOrigin?: PortOriginInterface;

    PortDestinationID?: number;
    PortDestinaton?: PortDestinationInterface;

    BaggageID?: number;
    Baggage?: BaggageInterface;
}