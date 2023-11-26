package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/GITTIIII/SE-TEAM11/entity"
)

// POST /dessert
func CreateDessert(c *gin.Context) {
	var dessert entity.Dessert
	
	// bind เข้าตัวแปร dessert
	if err := c.ShouldBindJSON(&dessert); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง dessert
	a := entity.Dessert{
		Dessert_name: dessert.Dessert_name,
		Count: dessert.Count,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /dessert/:id
func GetDessertById(c *gin.Context) {
	var dessert entity.Dessert
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM desserts WHERE id = ?", id).Find(&dessert).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dessert})
}

// GET /dessert
func GetAllDessert(c *gin.Context) {
	var dessert []entity.Dessert
	if err := entity.DB().Raw("SELECT * FROM desserts").Find(&dessert).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dessert})
}

// DELETE /dessert/:id
func DeleteDessert(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM desserts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dessert not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /dessert
func UpdateDessert(c *gin.Context) {
	var dessert entity.Dessert
	var result entity.Dessert

	if err := c.ShouldBindJSON(&dessert); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา dessert ด้วย id
	if tx := entity.DB().Where("id = ?", dessert.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dessert not found"})
		return
	}

	if err := entity.DB().Save(&dessert).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dessert})
}