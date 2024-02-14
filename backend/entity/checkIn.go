package entity

import (
	"gorm.io/gorm"
	"time"

	"github.com/asaskevich/govalidator"
)

type CheckIn struct {
	gorm.Model

	CheckIn_date  time.Time `valid:"CheckDateTime~วันที่ไม่ถูกต้อง"`

	BookPlanID *uint	`valid:"required~ต้องระบุ ID ของแผนการเดินทาง"`
	BookPlan BookPlan 	`gorm:"foreignKey:BookPlanID"  valid:"-"` 
}

func init() {
	govalidator.CustomTypeTagMap.Set("CheckDateTime", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		if t.Before(time.Now().Add(-2*time.Minute)) || t.After(time.Now().Add(2*time.Minute)) {
			return false

		} else {
			return true
		}
	})
}