package entity

import (
	"gorm.io/gorm"
)

type EmployeeRole struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`

	Employees []Employee `gorm:"foreignKey:EmployeeRoleID"`
}