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
		&EmployeeRole{},
		&Repair{},
		&Employee{},
		&Room{},
		&PortOrigin{},
		&PortDestination{},
		&Distance{},
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
		&BookPlan{},
		&CheckIn{},
		&Payment{},
	)
	db = database

	general := RepairType{
		Repair_name: "ทั่วไป",
	}
	db.Model(&RepairType{}).Create(&general)

	plumbing := RepairType{
		Repair_name: "ประปา",
	}
	db.Model(&RepairType{}).Create(&plumbing)

	
	electricity := RepairType{
		Repair_name: "ไฟฟ้า",
	}
	db.Model(&RepairType{}).Create(&electricity)

	standard := RoomType{
		RoomType_name: "Standard Room",
	}
	db.Model(&RoomType{}).Create(&standard)

	deluxe := RoomType{
		RoomType_name: "Deluxe Room",
	}
	db.Model(&RoomType{}).Create(&deluxe)

	excutive := RoomType{
		RoomType_name: "Excutive Room",
	}
	db.Model(&RoomType{}).Create(&excutive)

	suite := RoomType{
		RoomType_name: "Suite Room",
	}
	db.Model(&RoomType{}).Create(&suite)
	

	sea := RoomZone{
		RoomZone_name: "Sea view",
	}
	db.Model(&RoomZone{}).Create(&sea)

	garden := RoomZone{
		RoomZone_name: "Garden view",
	}
	db.Model(&RoomZone{}).Create(&garden)

	pool := RoomZone{
		RoomZone_name: "Pool view",
	}
	db.Model(&RoomZone{}).Create(&pool)

}