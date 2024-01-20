package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)


type Repair struct {
	gorm.Model
	Comment       string    `valid:"required~Detail is required,stringlength(2|100)~Detail must be between 2 and 256 characters"`
	Repair_img    string    `valid:"image_valid~รูปภาพไม่ถูกต้อง"`
	Repair_date   time.Time `valid:"required~Date is required,after_yesterday~Date must be from today to future"`
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


