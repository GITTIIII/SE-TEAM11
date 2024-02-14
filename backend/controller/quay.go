package controller

import (
	"net/http"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/gin-gonic/gin"
)

// POST /Quay
func CreateQuay(c *gin.Context) {
	var Quay entity.Quay

	// bind เข้าตัวแปร Quay
	if err := c.ShouldBindJSON(&Quay); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Quay
	a := entity.Quay{
		Quay_number: Quay.Quay_number,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /Quay/:id
func GetQuayById(c *gin.Context) {
	var Quay entity.Quay
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM Quays WHERE id = ?", id).Find(&Quay).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Quay})
}

// GET /Quay
func GetAllQuay(c *gin.Context) {
	var Quay []entity.Quay
	if err := entity.DB().Raw("SELECT * FROM Quays").Find(&Quay).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Quay})
}

// DELETE /Quay/:id
func DeleteQuay(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Quays WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Quay not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Quay
func UpdateQuay(c *gin.Context) {
	var Quay entity.Quay
	var result entity.Quay

	if err := c.ShouldBindJSON(&Quay); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา Quay ด้วย id
	if tx := entity.DB().Where("id = ?", Quay.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Quay not found"})
		return
	}

	if err := entity.DB().Save(&Quay).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Quay})
}
