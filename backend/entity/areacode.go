package entity

import (
	"gorm.io/gorm"
)


type AreaCode struct {
	gorm.Model
	Name string
	Employees []Employee `gorm:"foreignKey:AreaCodeID"`
}