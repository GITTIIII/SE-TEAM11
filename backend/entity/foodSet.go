package entity

import (
	"gorm.io/gorm"
)

type FoodSet struct {
	gorm.Model
	Name string		`gorm:"uniqueIndex" valid:"required~Name is required,stringlength(2|10)~Name must be between 2 and 10 characters"`
	Count     int		`valid:"required~Count is required,range(1|9999)~Count must be between 1 and 9999"`
	SavoryID *uint   `valid:"required~Savory is required"`
	Savory   *Savory `gorm:"foreignKey:SavoryID"`
	DrinkID *uint   `valid:"required~Drink is required"`
	Drink   *Drink `gorm:"foreignKey:DrinkID"`
	DessertID *uint   `valid:"required~Dessert is required"`
	Dessert   *Dessert `gorm:"foreignKey:DessertID"`
	BookPlans 	[]BookPlan 	`gorm:"foreignKey:FoodSetID"`

}

type Savory struct {
	gorm.Model
	Name string		`gorm:"uniqueIndex" valid:"required~Name is required,stringlength(2|10)~Name must be between 2 and 10 characters"`
	Count int		`valid:"required~Count is required,range(1|9999)~Count must be between 1 and 9999"`
	FoodSets 	[]FoodSet 	`gorm:"foreignKey:SavoryID"`

}

type Drink struct {
	gorm.Model
	Name string		`gorm:"uniqueIndex" valid:"required~Name is required,stringlength(2|10)~Name must be between 2 and 10 characters"`
	Count int		`valid:"required~Count is required,range(1|9999)~Count must be between 1 and 9999"`
	FoodSets 	[]FoodSet 	`gorm:"foreignKey:DrinkID"`


}

type Dessert struct {
	gorm.Model
	Name string		`gorm:"uniqueIndex" valid:"required~Name is required,stringlength(2|10)~Name must be between 2 and 10 characters"`
	Count int		`valid:"required~Count is required,range(1|9999)~Count must be between 1 and 9999"`
	FoodSets 	[]FoodSet 	`gorm:"foreignKey:DessertID"`


}