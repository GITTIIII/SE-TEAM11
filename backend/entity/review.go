package entity

import (
	"gorm.io/gorm"
)

type Review struct {
	gorm.Model
	Comment string
	
	TouristID *uint
	Tourist Tourist `gorm:"foreignKey:TouristID"`

	PlannerID *uint
	Planner Planner `gorm:"foreignKey:PlannerID"`
}