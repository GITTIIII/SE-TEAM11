import { RepairTypeInterface } from "./IRepairType";
import { EmployeeInterface } from "./IEmployee";
import { RoomInterface } from "./IRoom";

export interface RepairInterface {
    ID?: number;
    Comment?: string;
    Repair_img?: string;
    Repair_date?: Date;
    Repair_status?: string;

    RepairTypeID?: number;
    RepairType?: RepairTypeInterface;

    EmployeeID?: number;
    Employee?: EmployeeInterface;

    RoomID?: number;
    Room?: RoomInterface;
}