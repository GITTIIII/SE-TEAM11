package entity

import (

	
	"gorm.io/gorm"
	
)

type Payment struct {
	gorm.Model

	Price float32
	Payment_img string `valid:"required~กรุณาใส่รูปภาพ,image_valid~รูปภาพไม่ถูกต้อง"`
	
	BookPlanID *uint
	BookPlan BookPlan `gorm:"foreignKey:BookPlanID" valid:"-"`
}