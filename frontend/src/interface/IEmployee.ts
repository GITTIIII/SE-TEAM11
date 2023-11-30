import {EmployeeRoleInterface} from "./IEmployeeRole";

export interface EmployeeInterface {
    ID?: number;
    Employee_name?: string;
    Employee_gender?: string;
    Employee_tel?: string;
    Employee_email?: string;
    Employee_sex?: string;

    EmployeeRoleID?: number;
    EmployeeRole?: EmployeeRoleInterface;
}