package entity

import (
	"gorm.io/gorm"
)

type PortOrigin struct {
	gorm.Model

	PortOrigin_name string `gorm:"uniqueIndex"`

	Destinations []Destination `gorm:"foreignKey:PortOriginID"`
}