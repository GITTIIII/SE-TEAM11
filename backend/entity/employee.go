package entity

import (
	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	Name     string
	Tel      string `valid:"required~ต้องกรอกเบอร์โทร, matches(^[0]\\d{9}$)~เบอร์โทรต้องขึ้นต้นด้วย 0 และความยาว 10 ตัว"`
	Picture  string `valid:"required~ต้องระบุรูปภาพของลูกเรือ, image_valid~รูปภาพไม่ถูกต้อง"`
	Email    string `gorm:"uniqueIndex" valid:"required~ต้องกรอกอีเมลล์, email~รูปแบบอีเมลล์ไม่ถูกต้อง"`
	Password string `valid:"required~ต้องกรอกรหัสผ่าน,stringlength(8|50)~รหัสผ่านต้องมี 8 ตัวขึ้นไป สูงสุด 50 ตัว"`
	Age      int `valid:"required~ต้องกรอกอายุ,range(18|100)~อายุต้องอยู่ระหว่าง 18 ถึง 100 ปี"`

	GenderID *uint
	Gender   Gender `gorm:"foreignKey:GenderID"`

	AreaCodeID *uint
	AreaCode   AreaCode `gorm:"foreignKey:AreaCodeID"`

	EmployeeRoleID *uint
	EmployeeRole   EmployeeRole `gorm:"foreignKey:EmployeeRoleID"`

	Rooms        []Room        `gorm:"foreignKey:EmployeeID"`
	Repairs      []Repair      `gorm:"foreignKey:EmployeeID"`
	Destinations []Destination `gorm:"foreignKey:EmployeeID"`
	Planners     []Planner     `gorm:"foreignKey:EmployeeID"`
}
