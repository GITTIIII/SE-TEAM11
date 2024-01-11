package controller

import (
	"net/http"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// POST /bookActivity
func CreateBookActivity(c *gin.Context) {
	var bookActivity entity.BookActivity
	var bookPlan entity.BookPlan
	var tourist entity.Tourist
	var activity entity.Activity

	// bind เข้าตัวแปร bookActivity
	if err := c.ShouldBindJSON(&bookActivity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(bookActivity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง bookActivity
	a := entity.BookActivity{
		TimeStart: bookActivity.TimeStart,
		TimeEnd: bookActivity.TimeEnd,
		NumberOfPeople: bookActivity.NumberOfPeople,
		Comment: bookActivity.Comment,
		Phone_number: bookActivity.Phone_number,

		BookPlanID: bookActivity.BookPlanID,
		BookPlan: bookPlan,

		TouristID: bookActivity.TouristID,
		Tourist: tourist,

		ActivityID: bookActivity.ActivityID,
		Activity: activity,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /bookActivity/:id
func GetBookActivityById(c *gin.Context) {
	var bookActivity entity.BookActivity
	id := c.Param("id")
	if err := entity.DB().Preload("BookPlan").Preload("Tourist").Preload("Activity").Raw("SELECT * FROM book_activities WHERE id = ?", id).Find(&bookActivity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookActivity})
}

// GET /bookActivity
func GetAllBookActivity(c *gin.Context) {
	var bookActivity []entity.BookActivity
	if err := entity.DB().Preload("BookPlan").Preload("Tourist").Preload("Activity").Raw("SELECT * FROM book_activities").Find(&bookActivity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookActivity})
}

// DELETE /bookActivity/:id
func DeleteBookActivity(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM book_activities WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "BookActivity not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /bookActivity
func UpdateBookActivity(c *gin.Context) {
	var bookActivity entity.BookActivity
	var result entity.BookActivity

	if err := c.ShouldBindJSON(&bookActivity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา bookActivity ด้วย id
	if tx := entity.DB().Where("id = ?", bookActivity.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "BookActivity not found"})
		return
	}

	if err := entity.DB().Save(&bookActivity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookActivity})
}