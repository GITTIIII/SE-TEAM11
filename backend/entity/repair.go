package entity

import (
	"time"

	
	"gorm.io/gorm"
	"github.com/asaskevich/govalidator"
)


type Repair struct {
	gorm.Model
	Comment       string    `valid:"required~กรุณาใส่รายละเอียด,stringlength(1|100)~จำนวนตัวอักษรต้องอยู่ระหว่าง 1 ตัว ถึง 100 ตัว"`
	Repair_img    string    `valid:"required~กรุณาใส่รูปภาพ,image_valid~ไฟล์นี้ไม่ใช่รูปภาพ"`
	Repair_date   time.Time `valid:"required~กรุณาใส่วันเวลา,after_yesterday~กรุณาระบุวันเวลาตั้งแต่ปัจจุบันเป็นต้นไป"`
	Repair_status string

	RepairTypeID *uint
	RepairType   RepairType `gorm:"foreignKey:RepairTypeID"`

	EmployeeID *uint
	Employee   Employee `gorm:"foreignKey:EmployeeID" valid:"-"`

	RoomID *uint
	Room   Room `gorm:"foreignKey:RoomID" valid:"-"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("after_yesterday", func(i interface{}, c interface{}) bool {
		return truncateToDay(i.(time.Time).Local()).After(today().AddDate(0, 0, -1))
	})

	govalidator.TagMap["image_valid"] = govalidator.Validator(func(str string) bool {
		return govalidator.Matches(str, "^(data:image(.+);base64,.+)$")
	})
}

func truncateToDay(t time.Time) time.Time {
	return time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())
}

func today() time.Time {
	return truncateToDay(time.Now())
}


