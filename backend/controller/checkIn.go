package controller

import (
	"net/http"
	"time"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/gin-gonic/gin"
)

// POST /checkIn
func CreateCheckIn(c *gin.Context) {
	var checkIn entity.CheckIn
	var bookPlan entity.BookPlan

	// bind เข้าตัวแปร checkIn
	if err := c.ShouldBindJSON(&checkIn); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง checkIn
	a := entity.CheckIn{
		CheckIn_date: time.Now().Local(),

		BookPlanID: checkIn.BookPlanID,
		BookPlan:   bookPlan,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /checkIn/:id
func GetCheckInById(c *gin.Context) {
	var checkIn entity.CheckIn
	id := c.Param("id")
	if err := entity.DB().Preload("BookPlan").Raw("SELECT * FROM check_ins WHERE id = ?", id).Find(&checkIn).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": checkIn})
}

// GET /checkIn
func GetAllCheckIn(c *gin.Context) {
	var checkIn []entity.CheckIn
	if err := entity.DB().Preload("BookPlan").Raw("SELECT * FROM check_ins").Find(&checkIn).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": checkIn})
}

// DELETE /checkIn/:id
func DeleteCheckIn(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM check_ins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CheckIn not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /checkIn
func UpdateCheckIn(c *gin.Context) {
	var checkIn entity.CheckIn
	var result entity.CheckIn

	if err := c.ShouldBindJSON(&checkIn); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา checkIn ด้วย id
	if tx := entity.DB().Where("id = ?", checkIn.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CheckIn not found"})
		return
	}

	if err := entity.DB().Save(&checkIn).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": checkIn})
}

func UpdateCheckInStatus(c *gin.Context) {
	id := c.Param("id")
	var book_plan entity.BookPlan

	if err := entity.DB().Model(&book_plan).Where("id = ?", id).Update("check_in_status", "ลงทะเบียนเข้าพักสำเร็จ").Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": book_plan})
}

func GetBookPlanByDate(c *gin.Context) {
	var bookPlan []entity.BookPlan
	date := c.Param("date")
	if err := entity.DB().Preload("Planner").Preload("Tourist").Preload("Room").Preload("FoodSet").Joins("JOIN planners ON planners.ID = book_plans.planner_id").Where("DATE(planners.time_start) = ?", date).Find(&bookPlan).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookPlan})
}
