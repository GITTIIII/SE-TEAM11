package entity

import (
	"gorm.io/gorm"
)

type EmployeeRole struct {
	gorm.Model
	Name string 
	Role string

	Employees []Employee `gorm:"foreignKey:EmployeeRoleID"`
}