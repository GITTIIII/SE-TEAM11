package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/GITTIIII/SE-TEAM11/entity"
)

// POST /bookPlan
func CreateBookPlan(c *gin.Context) {
	var bookPlan entity.BookPlan
	var tourist entity.Tourist
	var planner entity.Planner
	var room entity.Room
	var foodSet entity.FoodSet

	// bind เข้าตัวแปร bookPlan
	if err := c.ShouldBindJSON(&bookPlan); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง bookPlan
	a := entity.BookPlan{
		PlannerID: bookPlan.PlannerID,
		Planner: planner,

		TouristID: bookPlan.TouristID,
		Tourist: tourist,

		RoomID: bookPlan.RoomID,
		Room: room,

		FoodSetID: bookPlan.FoodSetID,
		FoodSet: foodSet,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /bookPlan/:id
func GetBookPlanById(c *gin.Context) {
	var bookPlan entity.BookPlan
	id := c.Param("id")
	if err := entity.DB().Preload("Planner").Preload("Tourist").Preload("Room").Preload("FoodSet").Raw("SELECT * FROM book_plans WHERE id = ?", id).Find(&bookPlan).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookPlan})
}

// GET /bookPlan
func GetAllBookPlan(c *gin.Context) {
	var bookPlan []entity.BookPlan
	if err := entity.DB().Preload("Planner").Preload("Tourist").Preload("Room").Preload("FoodSet").Raw("SELECT * FROM book_plans").Find(&bookPlan).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookPlan})
}

// DELETE /bookPlan/:id
func DeleteBookPlan(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM book_plans WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "BookPlan not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /bookPlan
func UpdateBookPlan(c *gin.Context) {
	var bookPlan entity.BookPlan
	var result entity.BookPlan

	if err := c.ShouldBindJSON(&bookPlan); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา bookPlan ด้วย id
	if tx := entity.DB().Where("id = ?", bookPlan.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "BookPlan not found"})
		return
	}

	if err := entity.DB().Save(&bookPlan).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookPlan})
}