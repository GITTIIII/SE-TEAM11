package entity

import (
	"gorm.io/gorm"
)

//centroid entity//
type Bookplan struct {
	gorm.Model
	//primaryKey
	CheckIn []CheckIn `gorm:"foreignKey:BookplanID"`
	//foreignKey
	TouristID *uint
	Tourist Tourist `gorm:"foreignKey:TouristID"`

	PlannerID *uint
	Planner   Planner `gorm:"foreignKey:PlannerID"`

	RoomID *uint
	Room Room `gorm:"foreignKey:RoomID"`

	FoodSetID *uint
	FoodSet FoodSet`gorm:"foreignKey:FoodSetID"`
}
//-----------------------------------------------------------//
//Planner// 
type Planner struct {
	gorm.Model

	Bookplan []Bookplan `gorm:"foreignKey:PlannerID"`

	DestinationID *uint
	Destination Destination `gorm:"foreignKey:DestinationID"`
}
type Destination struct {
	gorm.Model

	Planner []Planner `gorm:"foreignKey:DestinationID"`

	PortOriginID *uint
	PortOrigin PortOrigin `gorm:"foreignKey:PortOriginID"`

	PortDestinationID *uint
	PortDestination PortDestination `gorm:"foreignKey:PortDestinationID"`

	BaggageID *uint
	Baggage Baggage `gorm:"foreignKey:BaggageID"`
}
type PortOrigin struct {
	gorm.Model

	Destination []Destination `gorm:"foreignKey:PortOriginID"`
}
type PortDestination struct {
	gorm.Model

	Destination []Destination `gorm:"foreignKey:PortDestinationID"`
}
type Baggage struct {
	gorm.Model

	Destination []Destination `gorm:"foreignKey:BaggageID"`
}
type Review struct {
	gorm.Model

	PlannerID *uint
	Planner Planner `gorm:"foreignKey:PlannerID"`

	TouristID *uint
	Tourist Tourist `gorm:"foreignKey:TouristID"`
}
//-----------------------------------------------------------//
//Room//
type Room struct {
	gorm.Model

	Bookplan []Bookplan `gorm:"foreignKey:RoomID"`

	RoomZoneID *uint
	RoomZone RoomZone `gorm:"foreignKey:RoomZoneID"`

	RoomTypeID *uint
	RoomType RoomType `gorm:"foreignKey:RoomTypeID"`

	EmployeeID *uint
	Employee Employee `gorm:"foreignKey:EmployeeID"`
}
type RoomZone struct {
	gorm.Model

	Room []Room `gorm:"foreignKey:RoomZoneID"`
}
type RoomType struct {
	gorm.Model

	Room []Room `gorm:"foreignKey:RoomTypeID"`
}
type AreaCode struct {
	gorm.Model

	Employee []Employee`gorm:"foreignKey:AreaCodeID"`
}
type Gender struct {
	gorm.Model

	Employee []Employee`gorm:"foreignKey:GenderID"`
}
type RoleEmp struct {
	gorm.Model

	Employee []Employee`gorm:"foreignKey:RoleEmpID"`
}
type Employee struct {
	gorm.Model

	Room []Room `gorm:"foreignKey:EmployeeID"`

	RoleEmpID *uint
	RoleEmp RoleEmp `gorm:"foreignKey:RoleEmpID"`

	AreaCodeID *uint
	AreaCode AreaCode `gorm:"foreignKey:AreaCodeID"`

	GenderID *uint
	Gender Gender `gorm:"foreignKey:GenderID"`
}
type RepairType struct {
	gorm.Model

	Repair []Repair `gorm:"foreignKey:RepairTypeID"`
}
type Repair struct {
	gorm.Model

	RoomID *uint
	Room Room `gorm:"foreignKey:RoomID"`

	EmployeeID *uint
	Employee Employee `gorm:"foreignKey:EmployeeID"`

	RepairTypeID *uint
	RepairType RepairType `gorm:"foreignKey:RepairTypeID"`
}
//-----------------------------------------------------------//
//Food//
type Savory struct {
	gorm.Model

	FoodSet []FoodSet `gorm:"foreignKey:SavoryID"`
	
}
type Dessert struct {
	gorm.Model

	FoodSet []FoodSet `gorm:"foreignKey:DessertID"`
	
}
type Drink struct {
	gorm.Model

	FoodSet []FoodSet `gorm:"foreignKey:DrinkID"`
	
}
type FoodSet struct {
	gorm.Model

	Bookplan []Bookplan `gorm:"foreignKey:FoodSetID"`

	SavoryID *uint
	Savory Savory `gorm:"foreignKey:SavoryID"`

	DessertID *uint
	Dessert Dessert `gorm:"foreignKey:DessertID"`

	DrinkID *uint
	Drink Drink `gorm:"foreignKey:DrinkID"`
}
//-----------------------------------------------------------//
//Tourist//
type BookActivity struct {
	gorm.Model

	TouristID *uint
	Tourist Tourist `gorm:"foreignKey:TouristID"`

	ActivityID *uint
	Activity Activity `gorm:"foreignKey:ActivityID"`

	PlannerID *uint
	Planner   Planner `gorm:"foreignKey:PlannerID"`
}
type Tourist struct {
	gorm.Model

	Bookplan []Bookplan `gorm:"foreignKey:TouristID"`
	BookActivity []BookActivity `gorm:"foreignKey:TouristID"`
	
}
type Activity struct {
	gorm.Model

	BookActivity []BookActivity `gorm:"foreignKey:ActivityID"`
}
//-----------------------------------------------------------//
type CheckIn struct {
	gorm.Model

	BookplanID *uint
	Bookplan Bookplan `gorm:"foreignKey:BookplanID"`
}
type Payment struct {
	gorm.Model
	
	BookplanID *uint
	Bookplan Bookplan `gorm:"foreignKey:BookplanID"`
}
//-----------------------------------------------------------//