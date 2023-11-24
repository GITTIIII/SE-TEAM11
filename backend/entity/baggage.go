package entity

import (
	"gorm.io/gorm"
)

type Baggage struct {
	gorm.Model
	WeightBaggage string 

	Destinations []Destination `gorm:"foreignKey:BaggageID"`
}