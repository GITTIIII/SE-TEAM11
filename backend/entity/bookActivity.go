package entity

import (
	"time"

	"gorm.io/gorm"
)

type BookActivity struct {
	gorm.Model

	Date time.Time `valid:"required~กรุณาเลือกวัน,after_yesterday~วันจะต้องเป็นตั้งแต่ปัจจุบัน"`
	Time string		`valid:"required~กรุณาเลือกเวลา"`
	NumberOfPeople int `valid:"required~กรุณาระบุจำนวนคน,range(1|10)~จำนวนคนต้องอยู่ระหว่าง 1 ถึง 10 คน"`
	Comment string
	Phone_number string `valid:"required~กรุณาใส่เบอร์โทรศัพท์, matches(^[0]\\d{9}$)~เบอร์โทรศัพท์ ต้องเริ่มต้นด้วยเลข 0 และให้มีความยาวทั้งหมด 10 หลัก"`

	BookPlanID uint
	BookPlan BookPlan `gorm:"foreignKey:BookPlanID" valid:"-"`

	TouristID uint
	Tourist Tourist `gorm:"foreignKey:TouristID" valid:"-"`

	ActivityID uint	`valid:"required~กรุณาเลือกกิจกรรม"`
	Activity Activity `gorm:"foreignKey:ActivityID" valid:"-"`
}