package entity

import (
	"gorm.io/gorm"
)

type RepairType struct {
	gorm.Model
	Repair_name string 
	Count int

	Repairs []Repair `gorm:"foreignKey:RepairTypeID"`
}