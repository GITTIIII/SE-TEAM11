package controller

import (
	"net/http"

	//"github.com/asaskevich/govalidator"
	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/gin-gonic/gin"
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

	if err := entity.DB().Model(&entity.Room{}).Where("id = ?", bookPlan.RoomID).Update("status", "ไม่ว่าง").Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง bookPlan
	a := entity.BookPlan{
		PlannerID: bookPlan.PlannerID,
		Planner:   planner,

		TouristID: bookPlan.TouristID,
		Tourist:   tourist,

		RoomID: bookPlan.RoomID,
		Room:   room,

		FoodSetID:      bookPlan.FoodSetID,
		FoodSet:        foodSet,
		Payment_status: "รอการชำระเงิน",
		CheckIn_status: "ยังไม่ลงทะเบียนเข้าพัก",
	}

	// if _, err := govalidator.ValidateStruct(bookPlan); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

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

// GET /bookPlan/byTouristId/:id 				//SELECT * FROM book_plans WHERE tourist_id = ? ORDER BY id DESC LIMIT 1
func GetBookPlanByTouristId(c *gin.Context) {
	var bookPlan []entity.BookPlan
	id := c.Param("id")
	if err := entity.DB().Preload("Planner").Preload("Tourist").Preload("Room").Preload("FoodSet").Raw("SELECT * FROM book_plans WHERE tourist_id = ? ORDER BY id DESC LIMIT 1", id).Find(&bookPlan).Error; err != nil {
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

	// Fetch the book plan for further actions if needed
	var bookPlan entity.BookPlan
	if err := entity.DB().First(&bookPlan, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "BookPlan not found"})
		return
	}

	// Fetch the room associated with the book plan
	var room entity.Room
	if err := entity.DB().First(&room, bookPlan.RoomID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
		return
	}

	// Delete the BookPlan by ID
	if tx := entity.DB().Exec("DELETE FROM book_plans WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "BookPlan not found"})
		return
	}

	// Update the status of the associated room
	if err := entity.DB().Model(&room).Update("status", "ว่าง").Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
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
