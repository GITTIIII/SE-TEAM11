package entity

import (
	"gorm.io/gorm"
)

type Distance struct {
	gorm.Model
	Distance string 

	Destinations []Destination `gorm:"foreignKey:DistanceID"`
}