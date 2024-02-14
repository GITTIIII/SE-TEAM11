package controller

import (
	"net/http"
	"time"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
)

type RepairUpdate struct {
	ID            uint64
	Comment       string `valid:"stringlength(2|100)~Detail must be between 2 and 256 characters"`
	Repair_img    string
	RepairTypeID  uint
	Repair_date   time.Time `valid:"after_yesterday~Date must be from today to future"`
	Repair_status string
}

// POST /repair
func CreateRepair(c *gin.Context) {
	var repair entity.Repair
	var repairType entity.RepairType
	var employee entity.Employee
	var room entity.Room

	// bind เข้าตัวแปร repair
	if err := c.ShouldBindJSON(&repair); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct
	if _, err := govalidator.ValidateStruct(repair); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง repair
	a := entity.Repair{
		Comment:       repair.Comment,
		Repair_img:    repair.Repair_img,
		Repair_date:   repair.Repair_date,
		Repair_status: repair.Repair_status,

		RepairTypeID: repair.RepairTypeID,
		RepairType:   repairType,

		EmployeeID: repair.EmployeeID,
		Employee:   employee,

		RoomID: repair.RoomID,
		Room:   room,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /repair/:id
func GetRepairById(c *gin.Context) {
	var repair entity.Repair
	id := c.Param("id")
	if err := entity.DB().Preload("RepairType").Preload("Employee").Preload("Room").Raw("SELECT * FROM repairs WHERE id = ?", id).Find(&repair).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": repair})
}

// GET /repair
func GetAllRepair(c *gin.Context) {
	var repair []entity.Repair
	if err := entity.DB().Preload("RepairType").Preload("Employee").Preload("Room").Raw("SELECT * FROM repairs WHERE deleted_at IS NULL").Find(&repair).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": repair})
}

// DELETE /repair/:id
func DeleteRepair(c *gin.Context) {
	var repair entity.Repair
	id := c.Param("id")

	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&repair, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "team not found"})
		return
	}

	// response deleted data
	c.JSON(http.StatusOK, gin.H{"data": "cancel your team successfully"})
}

// PATCH /Updaterepair
func UpdateRepair(c *gin.Context) {
	// create variable for store data as type of horse
	var repair RepairUpdate
	//get id from url

	// get data from body and check error
	if err := c.ShouldBindJSON(&repair); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//validate struct
	if _, err := govalidator.ValidateStruct(repair); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// update data in database and check error
	if err := entity.DB().Table("repairs").Where("id = ?", repair.ID).Updates(repair).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response updated data
	c.JSON(http.StatusOK, gin.H{"data": "updated your repairs successfully"})

}
