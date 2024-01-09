package entity

import (
	"time"
	"gorm.io/gorm"
)

type Repair struct {
	gorm.Model
	Comment    string  `valid:"required~Issue is required"`
	Repair_img	string `valid:"required~Image is required"`
	Repair_date time.Time
	Repair_status string

	RepairTypeID *uint
	RepairType RepairType `gorm:"foreignKey:RepairTypeID"`

	
	EmployeeID *uint
	Employee Employee `gorm:"foreignKey:EmployeeID"`
	
	RoomID *uint
	Room Room `gorm:"foreignKey:RoomID"`
	
}