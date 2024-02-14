package controller

import (
	"net/http"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/gin-gonic/gin"
)

// POST /repairType
func CreateRepairType(c *gin.Context) {
	var repairType entity.RepairType

	// bind เข้าตัวแปร repairType
	if err := c.ShouldBindJSON(&repairType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง repairType
	a := entity.RepairType{
		Repair_name: repairType.Repair_name,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /repairType/:id
func GetRepairTypeById(c *gin.Context) {
	var repairType entity.RepairType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM repair_types WHERE id = ?", id).Find(&repairType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": repairType})
}

// GET /repairType
func GetAllRepairType(c *gin.Context) {
	var repairType []entity.RepairType
	if err := entity.DB().Raw("SELECT * FROM repair_types").Find(&repairType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": repairType})
}

// DELETE /repairType/:id
func DeleteRepairType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM repair_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RepairType not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /repairType
func UpdateRepairType(c *gin.Context) {
	var repairType entity.RepairType
	var result entity.RepairType

	if err := c.ShouldBindJSON(&repairType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา repairType ด้วย id
	if tx := entity.DB().Where("id = ?", repairType.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RepairType not found"})
		return
	}

	if err := entity.DB().Save(&repairType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": repairType})
}
