package entity

import (
	"time"

	"gorm.io/gorm"
)

type Planner struct {
	gorm.Model
	Plan_name string `gorm:"uniqueIndex" valid:"required~กรอกชื่อทริป"`
	TimeStart 	time.Time `valid:"required~เวลาห้ามเป็นอดีต,after_yesterday~เวลาห้ามเป็นอดีต"`
	Plan_img    string	`valid:"required~ใส่รูปภาพ, image_valid~ใส่รูปภาพ"`
	Plan_price 		float64	`valid:"required~กรอกราคาช่วง 1000000 - 1000000, range(1000000|10000000)~กรอกราคาช่วง 1000000 - 1000000"`
	Planner_status string

	DestinationID *uint ` gorm:"uniqueIndex" valid:"required~เลือกจุดหมาย"`
	Destination Destination `gorm:"foreignKey:DestinationID" valid:"-"`

	EmployeeID	*uint
	Employee Employee	`gorm:"foreignKey:EmployeeID" valid:"-"`

	QuayID	*uint `valid:"required~เลือกชานชาลา"`
	Quay Quay`gorm:"foreignKey:QuayID" valid:"-"`

	BookPlans []BookPlan `gorm:"foreignKey:PlannerID"`

	Reviews []Review `gorm:"foreignKey:PlannerID"`
}