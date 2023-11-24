package entity

import (
	"gorm.io/gorm"
)

type FoodSet struct {
	gorm.Model

	Food_set_name string
	Count int

	SavoryID *uint
	Savory Savory `gorm:"foreignKey:SavoryID"`

	DessertID *uint
	Dessert Dessert `gorm:"foreignKey:DessertID"`

	DrinkID *uint
	Drink Drink `gorm:"foreignKey:DrinkID"`

	BookPlans []BookPlan `gorm:"foreignKey:FoodSetID"`
}