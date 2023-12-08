package entity

import (
	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	Name string 
	Gender string 
	Tel string 
	Email string `gorm:"uniqueIndex"`
	Password string 

	EmployeeRoleID *uint
	EmployeeRole EmployeeRole `gorm:"foreignKey:EmployeeRoleID"`

	Rooms []Room `gorm:"foreignKey:EmployeeID"`
	Repairs []Repair `gorm:"foreignKey:EmployeeID"`
}