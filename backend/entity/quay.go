package entity

import (
	"gorm.io/gorm"
)

type Quay struct {
	gorm.Model
	
	Quay_number string `gorm:"uniqueIndex " `

	Planners []Planner`gorm:"foreignKey:QuayID"`
}