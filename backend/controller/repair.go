package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/GITTIIII/SE-TEAM11/entity"
)

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
		Comment: repair.Comment,
		Repair_img: repair.Repair_img,
		Repair_date: repair.Repair_date,
		Repair_status: repair.Repair_status,
		
		RepairTypeID: repair.RepairTypeID,
		RepairType: repairType,

		EmployeeID: repair.EmployeeID,
		Employee: employee,

		RoomID: repair.RoomID,
		Room: room,
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
	if err := entity.DB().Preload("RepairType").Preload("Employee").Preload("Room").Raw("SELECT * FROM repairs").Find(&repair).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": repair})
}

// DELETE /repair/:id
func DeleteRepair(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM repairs WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Repair not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /repair
func UpdateRepair(c *gin.Context) {
	var repair entity.Repair
	var result entity.Repair

	if err := c.ShouldBindJSON(&repair); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา repair ด้วย id
	if tx := entity.DB().Where("id = ?", repair.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Repair not found"})
		return
	}

	if err := entity.DB().Save(&repair).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": repair})
}

