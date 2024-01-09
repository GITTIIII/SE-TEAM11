package entity

import (
	"gorm.io/gorm"
)

type FoodSet struct {
	gorm.Model
	Name      string
	Count     int
	SavoryID uint   `valid:"required~Savory is required"`
	Savory   Savory `gorm:"foreignKey:SavoryID"`
	DrinkID uint   `valid:"required~Drink is required"`
	Drink   Drink `gorm:"foreignKey:DrinkID"`
	DessertID uint   `valid:"required~Dessert is required"`
	Dessert   Dessert `gorm:"foreignKey:DessertID"`
}

type Savory struct {
	gorm.Model
	Name string
	Count int
}

type Drink struct {
	gorm.Model
	Name string
	Count int
}

type Dessert struct {
	gorm.Model
	Name string
	Count int
}