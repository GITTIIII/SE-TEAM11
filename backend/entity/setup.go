package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB { 
	return db  
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("cruiseship.db"), &gorm.Config{}) 
	if err != nil {
		panic("Failed to connect database")
	}
	database.AutoMigrate(   
		&RoomZone{},
		&RoomType{},
		&RepairType{},
		&AreaCode{},
		&Gender{},
		&RoleEmp{},
		&Repair{},
		&Employee{},
		&Room{},
		&PortOrigin{},
		&PortDestination{},
		&Baggage{},
		&Destination{},
		&Planner{},
		&Tourist{},
		&Activity{},
		&BookActivity{},
		&Review{},
		&Savory{},
		&Dessert{},
		&Drink{},
		&FoodSet{},
		&Bookplan{},
		&CheckIn{},
		&Payment{},
	)
	db = database
}