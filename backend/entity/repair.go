package entity

import (
	"time"
	"gorm.io/gorm"
)

type Repair struct {
	gorm.Model
	Comment    string  
	Repair_img	string 
	Repair_date time.Time
	Repair_status string

	RepairTypeID *uint
	RepairType RepairType `gorm:"foreignKey:RepairTypeID"`

	
	EmployeeID *uint
	Employee Employee `gorm:"foreignKey:EmployeeID"`
	
	RoomID *uint
	Room Room `gorm:"foreignKey:RoomID"`
	
}