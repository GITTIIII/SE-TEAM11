package entity

import (
	// "time"

	"gorm.io/gorm"
)

type Planner struct {
	gorm.Model
	Plan_name   string 	`gorm:"uniqueIndex"`
	Plan_img    string	`gorm:"type:longtext"`
	Price 		float64	`valid:"required~Plan price is required"`
	// TimeStart 	time.Time
	// TimeEnd 	time.Time


	DestinationID *uint
	Destination Destination `gorm:"foreignKey:DestinationID"`

	BookPlans []BookPlan `gorm:"foreignKey:PlannerID"`

	Reviews []Review `gorm:"foreignKey:PlannerID"`
}