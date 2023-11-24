package entity

import (
	"gorm.io/gorm"
)

type PortDestination struct {
	gorm.Model

	PortDestination_name string
	Place string
	Country string

	Destinations []Destination `gorm:"foreignKey:PortDestinationID"`
}