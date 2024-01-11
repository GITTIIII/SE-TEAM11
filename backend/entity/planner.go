package entity

import (
	"gorm.io/gorm"
)

type Planner struct {
	gorm.Model
	Plan_name    string 	`gorm:"uniqueIndex"`	
	Status 			string 
	Price float64

	DestinationID *uint
	Destination Destination `gorm:"foreignKey:DestinationID"`

	BookPlans []BookPlan `gorm:"foreignKey:PlannerID"`

	Reviews []Review `gorm:"foreignKey:PlannerID"`
}