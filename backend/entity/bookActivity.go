package entity

import (
	"time"

	"gorm.io/gorm"
)

type BookActivity struct {
	gorm.Model

	TimeStart time.Time `valid:"required~Date is required,after_yesterday~Date must be from today to future"`
	TimeEnd time.Time `valid:"required~Date is required,after_yesterday~Date must be from today to future"`
	NumberOfPeople int `valid:"required~NumberOfPeople is required,range(3|10)~NumberOfPeople must be between 3 and 10"`
	Comment string
	Phone_number string `valid:"required~PhoneNumber is required, matches(^[0]\\d{9}$)~PhoneNumber must start with 0 and have length 10 digits"`

	BookPlanID uint
	BookPlan BookPlan `gorm:"foreignKey:BookPlanID" valid:"-"`

	TouristID uint
	Tourist Tourist `gorm:"foreignKey:TouristID"`

	ActivityID uint
	Activity Activity `gorm:"foreignKey:ActivityID" valid:"-"`
}