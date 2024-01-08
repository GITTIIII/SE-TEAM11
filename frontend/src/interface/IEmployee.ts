import {EmployeeRoleInterface} from "./IEmployeeRole";

export interface EmployeeInterface {
    ID?: number;
    Name?: string;
    Gender?: string;
    Tel?: string;
    Picture?: string;
    Email?: string;

    EmployeeRoleID?: number;
    EmployeeRole?: EmployeeRoleInterface;
}