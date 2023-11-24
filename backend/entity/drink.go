package entity

import (
	"gorm.io/gorm"
)

type Drink struct {
	gorm.Model
	Drink_name string 
	Count int

	FoodSets []FoodSet `gorm:"foreignKey:DrinkID"`
}