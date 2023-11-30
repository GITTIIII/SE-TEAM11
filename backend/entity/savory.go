package entity

import (
	"gorm.io/gorm"
)

type Savory struct {
	gorm.Model
	Savory_name string 
	Count int

	FoodSets []FoodSet `gorm:"foreignKey:SavoryID"`
}