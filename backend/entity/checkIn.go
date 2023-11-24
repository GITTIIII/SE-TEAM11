package entity

import (
	"gorm.io/gorm"
)

type CheckIn struct {
	gorm.Model

	CheckIn_time string 
	CheckIn_date string

	BookPlanID *uint
	BookPlan BookPlan `gorm:"foreignKey:BookPlanID"`
}