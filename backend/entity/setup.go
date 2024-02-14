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
		&Quay{},
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


	// AreaCode Data
	database.Where(AreaCode{Name: "THAI +66"}).FirstOrCreate(&AreaCode{Name: "THAI +66"})
	database.Where(AreaCode{Name: "US +011"}).FirstOrCreate(&AreaCode{Name: "US +011"})

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

	//destination
	database.Where(PortOrigin{PortOrigin_name: "Nagoya Port"}).FirstOrCreate(&PortOrigin{PortOrigin_name: "Nagoya Port"})
	database.Where(PortOrigin{PortOrigin_name: "Holyhead Of Wales"}).FirstOrCreate(&PortOrigin{PortOrigin_name: "Holyhead Of Wales"})
	database.Where(PortOrigin{PortOrigin_name: "Ehoala port Of Madagascar"}).FirstOrCreate(&PortOrigin{PortOrigin_name: "Ehoala port Of Madagascar"})
	database.Where(PortOrigin{PortOrigin_name: "Port Of Oslo"}).FirstOrCreate(&PortOrigin{PortOrigin_name: "Port Of Oslo"})

	database.Where(PortDestination{PortDestination_name: "Shanghai International Port"}).FirstOrCreate(&PortDestination{PortDestination_name: "Shanghai International Port"})
	database.Where(PortDestination{PortDestination_name: "Port Sea Of New York & New Jersey"}).FirstOrCreate(&PortDestination{PortDestination_name: "Port Sea of New York & New Jersey"})
	database.Where(PortDestination{PortDestination_name: "Valencia Port Sea"}).FirstOrCreate(&PortDestination{PortDestination_name: "Valencia Port Sea"})
	database.Where(PortDestination{PortDestination_name: "London Bridge Port Sea"}).FirstOrCreate(&PortDestination{PortDestination_name: "London Bridge Port Sea"})

	database.Where(Distance{Distance: "3000"}).FirstOrCreate(&Distance{Distance: "3000"})
	database.Where(Distance{Distance: "4000"}).FirstOrCreate(&Distance{Distance: "4000"})
	database.Where(Distance{Distance: "5000"}).FirstOrCreate(&Distance{Distance: "5000"})
	database.Where(Distance{Distance: "6000"}).FirstOrCreate(&Distance{Distance: "6000"})
	database.Where(Distance{Distance: "7000"}).FirstOrCreate(&Distance{Distance: "7000"})
	database.Where(Distance{Distance: "8000"}).FirstOrCreate(&Distance{Distance: "8000"})
	database.Where(Distance{Distance: "9000"}).FirstOrCreate(&Distance{Distance: "9000"})
	database.Where(Distance{Distance: "10000"}).FirstOrCreate(&Distance{Distance: "10000"})
	database.Where(Distance{Distance: "11000"}).FirstOrCreate(&Distance{Distance: "11000"})
	database.Where(Distance{Distance: "12000"}).FirstOrCreate(&Distance{Distance: "12000"})
	database.Where(Distance{Distance: "13000"}).FirstOrCreate(&Distance{Distance: "13000"})
	database.Where(Distance{Distance: "14000"}).FirstOrCreate(&Distance{Distance: "14000"})

	database.Where(Quay{Quay_number: "1"}).FirstOrCreate(&Quay{Quay_number: "1"})
	database.Where(Quay{Quay_number: "2"}).FirstOrCreate(&Quay{Quay_number: "2"})
	database.Where(Quay{Quay_number: "3"}).FirstOrCreate(&Quay{Quay_number: "3"})
	database.Where(Quay{Quay_number: "4"}).FirstOrCreate(&Quay{Quay_number: "4"})
	database.Where(Quay{Quay_number: "5"}).FirstOrCreate(&Quay{Quay_number: "5"})
	database.Where(Quay{Quay_number: "6"}).FirstOrCreate(&Quay{Quay_number: "6"})

	adminRole := EmployeeRole{Name: "Admin"}
	db.Create(&adminRole)

	employeeRole := EmployeeRole{Name: "Employee"}
	db.Create(&employeeRole)

	GenderMale := Gender{Name: "Male"}
	db.Create(&GenderMale)

	GenderFemale := Gender{Name: "Female"}
	db.Create(&GenderFemale)

	AreaCode := AreaCode{Name: "ADMIN +007"}
	db.Create(&AreaCode)

	adminPassword := "admin"
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(adminPassword), 14)

	Employees := []Employee{
		{	
			Email:          "admin@gmail.com",
			Password:       string(hashedPassword),
			Name: 			"admin",
			Tel:            "0123456789",
			Picture:        "",
			Age:            19,
			EmployeeRoleID: &adminRole.ID,
			AreaCodeID: 	&AreaCode.ID,
			GenderID:       &GenderMale.ID,
		},
	}
	for _, employee := range Employees {
		db.Create(&employee) 
	}

	Activitys := []Activity{
		{ 	Activity_name: "มินิกอล์ฟ",
			Activity_img: "minigolf.jpg",
		},
		{ 	Activity_name: "โต๊ะปิงปอง",
			Activity_img: "tabletennis.jpg", 
		},
		{ 	Activity_name: "ปีนหน้าผา",
			Activity_img: "rock climbing wall.jpg", 
		},
		{ 	Activity_name: "สนามบาสเก็ตบอล",
			Activity_img: "basketball.jpg", 
		},
		{ 	Activity_name: "สวนน้ำและสไลเดอร์น้ำ",
			Activity_img: "water park.jpg", 
		},
		{ 	Activity_name: "คาราโอเกะ",
			Activity_img: "karaoke.jpg", 
		},
		{ 	Activity_name: "ฟิตเนส",
			Activity_img: "fitness.jpg", 
		},
		{ 	Activity_name: "บริการสปา",
			Activity_img: "spa.jpg", 
		},
		{	Activity_name: "กีฬาฟันดาบ",
			Activity_img: "fencing.jpg", 
		},
		{	Activity_name: "สเก็ตน้ำเเข็ง",
			Activity_img: "iceskates.jpg", 
		},
		{	Activity_name: "ยิงธนู",
			Activity_img: "archery.jpg",
		},
		{	Activity_name: "ดำน้ำ",
			Activity_img: "scuba.jpg",
		},
	}
	for _, activity := range Activitys {
		db.Create(&activity)
	}
	
}