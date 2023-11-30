package entity

import (
	"gorm.io/gorm"
)

type Dessert struct {
	gorm.Model
	Dessert_name string 
	Count int

	FoodSets []FoodSet `gorm:"foreignKey:DessertID"`
}