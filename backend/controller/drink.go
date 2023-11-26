package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/GITTIIII/SE-TEAM11/entity"
)

// POST /drink
func CreateDrink(c *gin.Context) {
	var drink entity.Drink
	
	// bind เข้าตัวแปร drink
	if err := c.ShouldBindJSON(&drink); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง drink
	a := entity.Drink{
		Drink_name: drink.Drink_name,
		Count: drink.Count,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /drink/:id
func GetDrinkById(c *gin.Context) {
	var drink entity.Drink
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM drinks WHERE id = ?", id).Find(&drink).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": drink})
}

// GET /drink
func GetAllDrink(c *gin.Context) {
	var drink []entity.Drink
	if err := entity.DB().Raw("SELECT * FROM drinks").Find(&drink).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": drink})
}

// DELETE /drink/:id
func DeleteDrink(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM drinks WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /drink
func UpdateDrink(c *gin.Context) {
	var drink entity.Drink
	var result entity.Drink

	if err := c.ShouldBindJSON(&drink); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา drink ด้วย id
	if tx := entity.DB().Where("id = ?", drink.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "drink not found"})
		return
	}

	if err := entity.DB().Save(&drink).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": drink})
}