import { AreaCodesInterface } from "./IAreaCode";
import { EmployeeRoleInterface } from "./IEmployeeRole";
import { GendersInterface } from "./IGender";


export interface EmployeeInterface {
    ID?: number;
    Email?: string;
    Password?: string;
    Name?: string;
    Tel?: string;
    Picture?: string;
    Age?: number;

    AreaCodeID?: number;
    AreaCode?: AreaCodesInterface;

    GenderID?: number;
    Gender?: GendersInterface;

    EmployeeRoleID?: number;
    EmployeeRole?: EmployeeRoleInterface;
}