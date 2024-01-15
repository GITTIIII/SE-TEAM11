package controller

import (
	"net/http"
	"time"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

type BookActivityUpdate struct {
	TimeStart time.Time
	TimeEnd time.Time
	NumberOfPeople int `valid:"required~NumberOfPeople is required,range(3|10)~NumberOfPeople must be between 3 and 10"`
	Comment string
	Phone_number string `valid:"required~PhoneNumber is required, matches(^[0]\\d{9}$)~PhoneNumber must start with 0 and have length 10 digits"`
	BookPlanID uint
	TouristID uint
	ActivityID uint
}

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

func GetAllBookActivityByTouristId(c *gin.Context) {
	var bookActivity []entity.BookActivity
	id := c.Param("id")
	if err := entity.DB().Preload("BookPlan").Preload("Tourist").Preload("Activity").Raw("SELECT * FROM book_activities WHERE tourist_id = ?",id).Find(&bookActivity).Error; err != nil {
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
	// create variable for store data as type of horse
	var bookActivitiy BookActivityUpdate
	//get id from url
	id := c.Param("id")

	// get data from body and check error
	if err := c.ShouldBindJSON(&bookActivitiy); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//validate struct
	if _, err := govalidator.ValidateStruct(bookActivitiy); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// update data in database and check error
	if err := entity.DB().Table("book_activities").Where("id = ?", id).Updates(bookActivitiy).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response updated data
	c.JSON(http.StatusOK, gin.H{"data": "updated your book_activities successfully"})

}
