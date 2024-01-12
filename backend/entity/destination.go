package entity

import (
	// "time"

	"gorm.io/gorm"
)

type Destination struct {
	gorm.Model

	// Destination_Img		string 

	PortOriginID *uint	`valid:"required~PortOrigin is required"`
	PortOrigin PortOrigin `gorm:"foreignKey:PortOriginID"`

	PortDestinationID *uint	`valid:"required~PortDestination is required"`
	PortDestination PortDestination `gorm:"foreignKey:PortDestinationID"`

	DistanceID *uint	`valid:"required~Distance is required"`
	Distance Distance `gorm:"foreignKey:DistanceID"`
}