package entity

import (
	// "time"

	"gorm.io/gorm"
)

type Destination struct {
	gorm.Model

	Destination_name   string 	`gorm:"uniqueIndex" valid:"required~Destination is required"`
	Destination_img    string	`valid:"image_valid~รูปภาพไม่ถูกต้อง"`
	Destination_price 		float64	`valid:"required~Destination price is required, range(1000000|10000000)~Destination price between 1000000-10000000"`

	PortOriginID *uint	`valid:"required~PortOrigin is required"`
	PortOrigin PortOrigin `gorm:"foreignKey:PortOriginID"`

	PortDestinationID *uint	`valid:"required~PortDestination is required"`
	PortDestination PortDestination `gorm:"foreignKey:PortDestinationID"`

	DistanceID *uint	`valid:"required~Distance is required"`
	Distance Distance `gorm:"foreignKey:DistanceID"`
}