package entity

import (
	"gorm.io/gorm"
)

type PortDestination struct {
	gorm.Model

	PortDestination_name string `gorm:"uniqueIndex"`
	Destinations []Destination `gorm:"foreignKey:PortDestinationID"`
}