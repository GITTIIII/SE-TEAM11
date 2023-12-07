package controller

import (
	"net/http"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/gin-gonic/gin"
)

// POST /Distance
func CreateDistance(c *gin.Context) {
	var Distance entity.Distance
	

	// bind เข้าตัวแปร Distance
	if err := c.ShouldBindJSON(&Distance); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Distance
	a := entity.Distance{
		Distance: Distance.Distance,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /Distance/:id
func GetDistanceById(c *gin.Context) {
	var Distance entity.Distance
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM Distance WHERE id = ?", id).Find(&Distance).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Distance})
}

// GET /Distance
func GetAllDistance(c *gin.Context) {
	var Distance []entity.Distance
	if err := entity.DB().Raw("SELECT * FROM Distance").Find(&Distance).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Distance})
}

// DELETE /Distance/:id
func DeleteDistance(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Distance WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Distance not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Distance
func UpdateDistance(c *gin.Context) {
	var Distance entity.Distance
	var result entity.Distance

	if err := c.ShouldBindJSON(&Distance); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา Distance ด้วย id
	if tx := entity.DB().Where("id = ?", Distance.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Distance not found"})
		return
	}

	if err := entity.DB().Save(&Distance).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Distance})
}