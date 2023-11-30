package entity

import (
	"gorm.io/gorm"
)

type RepairType struct {
	gorm.Model
	Repair_name string `gorm:"uniqueIndex"`

	Repairs []Repair `gorm:"foreignKey:RepairTypeID"`
}