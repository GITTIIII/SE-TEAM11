import { RoomTypeInterface } from "./IRoomType";
import { RoomZoneInterface } from "./IRoomZone";
import { EmployeeInterface } from "./IEmployee";

export interface RoomInterface {
    ID?: number;
    Room_number?: string;
    Room_img?: string;
    Status?: string;
    Price?: number;

    RoomTypeID?: number;
    RoomType?: RoomTypeInterface;

    RoomZoneID?: number;
    RoomZone?: RoomZoneInterface;

    EmployeeID?: number;
    Employee?: EmployeeInterface;
}