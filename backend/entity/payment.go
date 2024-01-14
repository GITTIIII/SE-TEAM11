package entity

import (
	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model

	Price float32
	Payment_img string
	Status string

	BookPlanID *uint
	BookPlan BookPlan `gorm:"foreignKey:BookPlanID"`
}