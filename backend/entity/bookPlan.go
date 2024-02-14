package entity

import (
	"gorm.io/gorm"
)

type BookPlan struct {
	gorm.Model

	PlannerID *uint
	Planner Planner `gorm:"foreignKey:PlannerID"`

	TouristID *uint
	Tourist Tourist `gorm:"foreignKey:TouristID"`

	RoomID *uint
	Room Room `gorm:"foreignKey:RoomID"`

	FoodSetID *uint
	FoodSet FoodSet `gorm:"foreignKey:FoodSetID"`

	Payment_status string
	CheckIn_status string

	Payments []Payment `gorm:"foreignKey:BookPlanID"`
	CheckIns []CheckIn `gorm:"foreignKey:BookPlanID"`
	BookActivitys []BookActivity `gorm:"foreignKey:BookPlanID"`

}