package entity

import (
	"golang.org/x/crypto/bcrypt"
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

	database.Where(RoomType{RoomType_name: "Standard Room"}).FirstOrCreate(&RoomType{RoomType_name: "Standard Room"})
	database.Where(RoomType{RoomType_name: "Deluxe Room"}).FirstOrCreate(&RoomType{RoomType_name: "Deluxe Room"})
	database.Where(RoomType{RoomType_name: "Excutive Room"}).FirstOrCreate(&RoomType{RoomType_name: "Excutive Room"})
	database.Where(RoomType{RoomType_name: "Suite Room"}).FirstOrCreate(&RoomType{RoomType_name: "Suite Room"})

	database.Where(RoomZone{RoomZone_name: "Sea view"}).FirstOrCreate(&RoomZone{RoomZone_name: "Sea view"})
	database.Where(RoomZone{RoomZone_name: "Garden view"}).FirstOrCreate(&RoomZone{RoomZone_name: "Garden view"})
	database.Where(RoomZone{RoomZone_name: "Pool view"}).FirstOrCreate(&RoomZone{RoomZone_name: "Pool view"})

	adminRole := EmployeeRole{Name: "Admin"}
	db.Create(&adminRole)

	employeeRole := EmployeeRole{Name: "Employee"}
	db.Create(&employeeRole)

	adminPassword := "admin"
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(adminPassword), 14)

	Employees := []Employee{
		{	Name: "admin",
			Gender:      "Male",
			Tel: "0123456789",
			Picture:     "",
			Email:    "admin@gmail.com",
			Password:    string(hashedPassword),
			EmployeeRoleID:    &adminRole.ID,
		},
	}

	for _, employee := range Employees {
		db.Create(&employee) // Assuming 'db' is your GORM database instance
	}

}