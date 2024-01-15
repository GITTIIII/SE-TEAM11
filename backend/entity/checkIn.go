package entity

import (
	"gorm.io/gorm"
	"time"
)

type CheckIn struct {
	gorm.Model

	CheckIn_date  time.Time

	BookPlanID uint
	BookPlan BookPlan `gorm:"foreignKey:BookPlanID"`
}