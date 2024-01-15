package entity

import (
	"gorm.io/gorm"
)

type Activity struct {
	gorm.Model
	Activity_name string `gorm:"uniqueIndex" valid:"required~Activity is required"`
	Activity_img    string    `valid:"required~Image is required"`

	BookActivitys []BookActivity `gorm:"foreignKey:ActivityID"`
}