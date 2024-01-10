package entity

import (
	"time"
	"gorm.io/gorm"
)

type BookActivity struct {
	gorm.Model

	TimeStart time.Time
	TimeEnd time.Time
	NumberOfPeople int `valid:"range(3|10)~NumberOfPeople Must be between 3-10"`
	Comment string
	Phone_number string `valid:"required~PhoneNumber is required, matches(^[0]\\d{10}$)~PhoneNumber length is not 10 digits"`

	BookPlanID *uint
	BookPlan BookPlan `gorm:"foreignKey:BookPlanID"`

	TouristID *uint
	Tourist Tourist `gorm:"foreignKey:TouristID"`

	ActivityID *uint
	Activity Activity `gorm:"foreignKey:ActivityID"`
}