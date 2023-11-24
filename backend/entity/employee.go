package entity

import (
	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	Employee_name string 
	Employee_gender string 
	Employee_tel string 
	Employee_email string 	
	Employee_sex string 

	EmployeeRoleID *uint
	EmployeeRole EmployeeRole `gorm:"foreignKey:EmployeeRoleID"`

	Rooms []Room `gorm:"foreignKey:EmployeeID"`
	Repairs []Repair `gorm:"foreignKey:EmployeeID"`
}