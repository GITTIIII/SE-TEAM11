package entity

import (
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	Room_number    	string	`gorm:"uniqueIndex" valid:"required~Room number is required, matches(^[SDET][0-9]{4}[sgp]$)~Room number pattern not match [SDET][0-9]{4}[sgp]"`
	Room_img		string	`valid:"required~Room image is required"`
	Status 			string 
	Room_price 		float64	`valid:"required~Room price is required, range(10000|100000)~Room price between 10000-100000"`

	RoomTypeID *uint	`valid:"required~Room type is required"`
	RoomType RoomType	`gorm:"foreignKey:RoomTypeID" valid:"-"`

	RoomZoneID *uint	`valid:"required~Room zone is required"`
	RoomZone RoomZone	`gorm:"foreignKey:RoomZoneID" valid:"-"`

	EmployeeID *uint
	Employee Employee	`gorm:"foreignKey:EmployeeID" valid:"-"`

	Repairs 	[]Repair 	`gorm:"foreignKey:RoomID"`
	BookPlans 	[]BookPlan 	`gorm:"foreignKey:RoomID"`
}