package entity

import (
	"time"

	"gorm.io/gorm"
)

type Planner struct {
	gorm.Model
	TimeStart 	time.Time
	TimeEnd 	time.Time


	DestinationID *uint
	Destination Destination `gorm:"foreignKey:DestinationID"`

	BookPlans []BookPlan `gorm:"foreignKey:PlannerID"`

	Reviews []Review `gorm:"foreignKey:PlannerID"`
}