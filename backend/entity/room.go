package entity

import (
	"gorm.io/gorm"
	// "os"
	// "reflect"

	// "github.com/asaskevich/govalidator"
	// "github.com/gabriel-vasile/mimetype"
)

type Room struct {
	gorm.Model
	Room_number    	string	`gorm:"uniqueIndex" valid:"required~ต้องระบุหมายเลขห้องพัก, matches(^[SDET][0-9]{4}[sgp]$)~เลขห้องพักต้องขึ้นต้นด้วย SEDT ตามด้วยตัวเลข 4 ตัว และลงท้ายด้วย sgp"`
	Room_img		string	`valid:"required~ต้องระบุรูปภาพของห้องพัก, image_valid~รูปภาพไม่ถูกต้อง"`
	Status 			string 
	Room_price 		float64	`valid:"required~ต้องระบุราคาของห้องพัก, range(10000|100000)~ราคาของห้องพักต้องอยู่ระหว่าง 10000-100000"`

	RoomTypeID	*uint	`valid:"required~Room type is required"`
	RoomType RoomType	`gorm:"foreignKey:RoomTypeID" valid:"-"`

	RoomZoneID	*uint	`valid:"required~Room zone is required"`
	RoomZone RoomZone	`gorm:"foreignKey:RoomZoneID" valid:"-"`

	EmployeeID	*uint
	Employee Employee	`gorm:"foreignKey:EmployeeID" valid:"-"`

	Repairs 	[]Repair 	`gorm:"foreignKey:RoomID"`
	BookPlans 	[]BookPlan 	`gorm:"foreignKey:RoomID"`
}