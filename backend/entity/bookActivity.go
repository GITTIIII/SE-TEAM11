package entity

import (
	"time"
	"gorm.io/gorm"
)

type BookActivity struct {
	gorm.Model

	Time time.Time
	NumberOfPeople int
	Comment string
	Phone_number string

	BookPlanID *uint
	BookPlan BookPlan `gorm:"foreignKey:BookPlanID"`

	TouristID *uint
	Tourist Tourist `gorm:"foreignKey:TouristID"`

	ActivityID *uint
	Activity Activity `gorm:"foreignKey:ActivityID"`
}