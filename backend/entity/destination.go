package entity

import (
	// "time"
	"gorm.io/gorm"
)

type Destination struct {
	gorm.Model
	
	Destination_name   string 	`gorm:"uniqueIndex" valid:"required~กรอกต้นทาง - ปลายทาง"`
	Comment       string    `valid:"required~จำนวนตัวอักษรต้องอยู่ระหว่าง 1 ตัว ถึง 100 ตัว,stringlength(1|100)~จำนวนตัวอักษรต้องอยู่ระหว่าง 1 ตัว ถึง 100 ตัว"`

	PortOriginID *uint	` valid:"required~เลือกต้นทาง"`
	PortOrigin PortOrigin `gorm:"foreignKey:PortOriginID"`

	PortDestinationID *uint	`valid:"required~เลือกปลายทาง"`
	PortDestination PortDestination `gorm:"foreignKey:PortDestinationID"  `

	DistanceID *uint `valid:"required~เลือกระยะทาง"`
	Distance Distance `gorm:"foreignKey:DistanceID"`
	
	EmployeeID	*uint 
	Employee Employee	`gorm:"foreignKey:EmployeeID" valid:"-"`

	Planners []Planner `gorm:"foreignKey:DestinationID"` 
}