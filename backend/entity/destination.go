package entity

import (
	// "time"

	"gorm.io/gorm"
)

type Destination struct {
	gorm.Model

	Destination_name   string 	`gorm:"uniqueIndex"`
	Destination_img    string	`valid:"required~Destination image is required"`
	Destination_price 		float64	`valid:"required~Destination price is required, range(10000|100000)~Room price between 10000-100000"`

	PortOriginID *uint	`valid:"required~PortOrigin is required"`
	PortOrigin PortOrigin `gorm:"foreignKey:PortOriginID"`

	PortDestinationID *uint	`valid:"required~PortDestination is required"`
	PortDestination PortDestination `gorm:"foreignKey:PortDestinationID"`

	DistanceID *uint	`valid:"required~Distance is required"`
	Distance Distance `gorm:"foreignKey:DistanceID"`
}