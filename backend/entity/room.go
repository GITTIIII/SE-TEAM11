package entity

import (
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	Room_number    	string	`gorm:"uniqueIndex" valid:"required~Issue is required, matches(^[SDAT]\\d{4}$)~Format incorrect"`
	Room_img		string	`valid:"required~Room image is required"`
	Status 			string 
	Room_price 		float64	`valid:"required~Room price is required"`

	RoomTypeID *uint	//`valid:"required~Room type is required"`
	RoomType RoomType	`gorm:"foreignKey:RoomTypeID" valid:"-"`

	RoomZoneID *uint	//`valid:"required~Room zone is required"`
	RoomZone RoomZone	`gorm:"foreignKey:RoomZoneID" valid:"-"`

	EmployeeID *uint
	Employee Employee	`gorm:"foreignKey:EmployeeID" valid:"-"`

	Repairs 	[]Repair 	`gorm:"foreignKey:RoomID"`
	BookPlans 	[]BookPlan 	`gorm:"foreignKey:RoomID"`
}