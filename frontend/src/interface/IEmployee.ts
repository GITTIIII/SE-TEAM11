import {EmployeeRoleInterface} from "./IEmployeeRole";

export interface EmployeeInterface {
    ID?: number;
    Email?: string;
    Password?: string;
    Name?: string;
    Gender?: string;
    Tel?: string;
    Picture?: string;
    Age?: number;
    

    EmployeeRoleID?: number;
    EmployeeRole?: EmployeeRoleInterface;
}