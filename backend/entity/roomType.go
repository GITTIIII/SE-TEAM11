package entity

import (
	"gorm.io/gorm"
)

type RoomType struct {
	gorm.Model
	RoomType_name string `gorm:"uniqueIndex"`

	Rooms []Room `gorm:"foreignKey:RoomTypeID"`
}