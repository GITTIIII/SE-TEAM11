package entity

import (
	"gorm.io/gorm"
)

type PortOrigin struct {
	gorm.Model

	PortOrigin_name string
	Place string
	Country string

	Destinations []Destination `gorm:"foreignKey:PortOriginID"`
}