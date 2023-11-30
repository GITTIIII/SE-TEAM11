package entity

import (
	"gorm.io/gorm"
)

type RoomType struct {
	gorm.Model
	RoomType_name string 

	Rooms []Room `gorm:"foreignKey:RoomTypeID"`
}