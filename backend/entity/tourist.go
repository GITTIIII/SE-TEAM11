package entity

import (
	"gorm.io/gorm"
)

type Tourist struct {
	gorm.Model
	Email    string `gorm:"uniqueIndex" valid:"required~Email is required"`
	Password string `valid:"stringlength(8|20)~Password at least 8 and no more than 20"`
	Tourist_name string 
	Phone string `valid:"matches(^[0]\\d{9}$)~PhoneNumber must start with 0 and have length 10 digits"`
	Picture string
	Age int `valid:"range(18|100)~Age must be between 18 and 100"`
	Gender string

	BookPlans []BookPlan `gorm:"foreignKey:TouristID"`
	
	Reviews []Review `gorm:"foreignKey:TouristID"`
	
	BookActivitys []BookActivity `gorm:"foreignKey:TouristID"`
}