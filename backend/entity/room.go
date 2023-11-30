package entity

import (
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	Room_number    string 
	Room_img	string
	Status string 
	Price float32

	RoomTypeID *uint
	RoomType RoomType `gorm:"foreignKey:RoomTypeID"`

	RoomZoneID *uint
	RoomZone RoomZone `gorm:"foreignKey:RoomZoneID"`

	EmployeeID *uint
	Employee Employee `gorm:"foreignKey:EmployeeID"`

	Repairs []Repair `gorm:"foreignKey:RoomID"`
	BookPlans []BookPlan `gorm:"foreignKey:RoomID"`
}