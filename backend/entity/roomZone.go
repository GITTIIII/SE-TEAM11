package entity

import (
	"gorm.io/gorm"
)

type RoomZone struct {
	gorm.Model
	RoomZone_name string `gorm:"uniqueIndex"`

	Rooms []Room `gorm:"foreignKey:RoomZoneID"`
}