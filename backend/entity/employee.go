package entity

import (
	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	Name     string
	Gender   string
	Tel      string
	Picture  string
	Email    string `gorm:"uniqueIndex" valid:"required~Email is required, email~Email is invalid"`
	Password string
	Age      int

	EmployeeRoleID *uint
	EmployeeRole   EmployeeRole `gorm:"foreignKey:EmployeeRoleID"`

	Rooms   []Room   `gorm:"foreignKey:EmployeeID"`
	Repairs []Repair `gorm:"foreignKey:EmployeeID"`
}
