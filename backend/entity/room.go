package entity

import (
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	Room_number    	string	`gorm:"uniqueIndex" valid:"required~Issue is required, matches(^[SDAT]\\d{4}$)"`
	Room_img		string	`valid:"required~Issue is required"`
	Status 			string 
	Room_price 		float64	`valid:"required~Issue is required"`

	RoomTypeID *uint
	RoomType RoomType `gorm:"foreignKey:RoomTypeID"`

	RoomZoneID *uint
	RoomZone RoomZone `gorm:"foreignKey:RoomZoneID"`

	EmployeeID *uint
	Employee Employee `gorm:"foreignKey:EmployeeID"`

	Repairs 	[]Repair 	`gorm:"foreignKey:RoomID"`
	BookPlans 	[]BookPlan 	`gorm:"foreignKey:RoomID"`
}