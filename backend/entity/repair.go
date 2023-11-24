package entity

import (
	"gorm.io/gorm"
)

type Repair struct {
	gorm.Model
	Comment    string 
	Repair_img	string

	RepairTypeID *uint
	RepairType RepairType `gorm:"foreignKey:RepairTypeID"`

	
	EmployeeID *uint
	Employee Employee `gorm:"foreignKey:EmployeeID"`
	
	RoomID *uint
	Room Room `gorm:"foreignKey:RoomID"`
	
}