package entity

import (
	"gorm.io/gorm"
)

type Planner struct {
	gorm.Model
	Plan_name    string 
	Price float32
	Plan_time string 
	Plan_date string 

	DestinationID *uint
	Destination Destination `gorm:"foreignKey:DestinationID"`

	BookPlans []BookPlan `gorm:"foreignKey:PlannerID"`

	Reviews []Review `gorm:"foreignKey:PlannerID"`
	
	BookActivitys []BookActivity `gorm:"foreignKey:PlannerID"`
}