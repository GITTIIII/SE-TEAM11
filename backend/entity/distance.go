package entity

import (
	"gorm.io/gorm"
)

type Distance struct {
	gorm.Model
	Distance string `gorm:"uniqueIndex"`

	Destinations []Destination `gorm:"foreignKey:DistanceID"`
}