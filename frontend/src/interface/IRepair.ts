import { RepairTypeInterface } from "./IRepairType";
import { EmployeeInterface } from "./IEmployee";
import { RoomInterface } from "./IRoom";

export interface RepairInterface {
    ID?: number;
    Comment?: string;
    Repair_img?: string

    RepairTypeID?: number;
    RepairType?: RepairTypeInterface;

    EmployeeID?: number;
    Employee?: EmployeeInterface;

    RoomID?: number;
    Room?: RoomInterface;
}