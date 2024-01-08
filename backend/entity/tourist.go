package entity

import (
	"gorm.io/gorm"
)

type Tourist struct {
	gorm.Model
	Email    string `gorm:"uniqueIndex"`
	Password string 
	Tourist_name string 
	Phone string 
	Picture string
	Age int
	Gender string

	BookPlans []BookPlan `gorm:"foreignKey:TouristID"`
	
	Reviews []Review `gorm:"foreignKey:TouristID"`
	
	BookActivitys []BookActivity `gorm:"foreignKey:TouristID"`
}