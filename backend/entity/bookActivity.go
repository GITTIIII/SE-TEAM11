package entity

import (
	"gorm.io/gorm"
)

type BookActivity struct {
	gorm.Model
	Time string 

	PlannerID *uint
	Planner Planner `gorm:"foreignKey:PlannerID"`

	TouristID *uint
	Tourist Tourist `gorm:"foreignKey:TouristID"`

	ActivityID *uint
	Activity Activity `gorm:"foreignKey:ActivityID"`
}