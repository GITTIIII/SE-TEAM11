package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/GITTIIII/SE-TEAM11/entity"
)

// POST /foodSet
func CreateFoodSet(c *gin.Context) {
	var foodSet entity.FoodSet
	var savory entity.Savory
	var dessert entity.Dessert
	var drink entity.Drink 

	// bind เข้าตัวแปร foodSet
	if err := c.ShouldBindJSON(&foodSet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง foodSet
	a := entity.FoodSet{
		FoodSet_name: foodSet.FoodSet_name,
		Count: foodSet.Count,

		SavoryID: foodSet.SavoryID,
		Savory: savory,

		DessertID: foodSet.DessertID,
		Dessert: dessert,

		DrinkID: foodSet.DrinkID,
		Drink: drink,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /foodSet/:id
func GetFoodSetById(c *gin.Context) {
	var foodSet entity.FoodSet
	id := c.Param("id")
	if err := entity.DB().Preload("Savory").Preload("Dessert").Preload("Drink").Raw("SELECT * FROM food_sets WHERE id = ?", id).Find(&foodSet).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": foodSet})
}

// GET /foodSet
func GetAllFoodSet(c *gin.Context) {
	var foodSet []entity.FoodSet
	if err := entity.DB().Preload("Savory").Preload("Dessert").Preload("Drink").Raw("SELECT * FROM food_sets").Find(&foodSet).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": foodSet})
}

// DELETE /foodSet/:id
func DeleteFoodSet(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM food_sets WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "FoodSet not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /foodSet
func UpdateFoodSet(c *gin.Context) {
	var foodSet entity.FoodSet
	var result entity.FoodSet

	if err := c.ShouldBindJSON(&foodSet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา foodSet ด้วย id
	if tx := entity.DB().Where("id = ?", foodSet.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "FoodSet not found"})
		return
	}

	if err := entity.DB().Save(&foodSet).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": foodSet})
}