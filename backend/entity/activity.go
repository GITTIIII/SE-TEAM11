package entity

import (
	"gorm.io/gorm"
)

type Activity struct {
	gorm.Model
	Activity_name string `gorm:"uniqueIndex" valid:"required~Activity is required"`

	BookActivitys []BookActivity `gorm:"foreignKey:ActivityID"`
}