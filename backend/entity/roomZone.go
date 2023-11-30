package entity

import (
	"gorm.io/gorm"
)

type RoomZone struct {
	gorm.Model
	RoomZone_name string 

	Rooms []Room `gorm:"foreignKey:RoomZoneID"`
}