package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/GITTIIII/SE-TEAM11/entity"
)

// POST /savory
func CreateSavory(c *gin.Context) {
	var savory entity.Savory
	
	// bind เข้าตัวแปร savory
	if err := c.ShouldBindJSON(&savory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง savory
	a := entity.Savory{
		Savory_name: savory.Savory_name,
		Count: savory.Count,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /savory/:id
func GetSavoryById(c *gin.Context) {
	var savory entity.Savory
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM savories WHERE id = ?", id).Find(&savory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": savory})
}

// GET /savory
func GetAllSavory(c *gin.Context) {
	var savory []entity.Savory
	if err := entity.DB().Raw("SELECT * FROM savories").Find(&savory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": savory})
}

// DELETE /savory/:id
func DeleteSavory(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM savories WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Savory not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /savory
func UpdateSavory(c *gin.Context) {
	var savory entity.Savory
	var result entity.Savory

	if err := c.ShouldBindJSON(&savory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา savory ด้วย id
	if tx := entity.DB().Where("id = ?", savory.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Savory not found"})
		return
	}

	if err := entity.DB().Save(&savory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": savory})
}