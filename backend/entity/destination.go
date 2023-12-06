package entity

import (
	"gorm.io/gorm"
)

type Destination struct {
	gorm.Model

	PortOriginID *uint
	PortOrigin PortOrigin `gorm:"foreignKey:PortOriginID"`

	PortDestinationID *uint
	PortDestination PortDestination `gorm:"foreignKey:PortDestinationID"`

	DistanceID *uint
	Distance Distance `gorm:"foreignKey:DistanceID"`
}