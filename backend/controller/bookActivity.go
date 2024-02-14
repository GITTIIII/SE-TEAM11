package controller

import (
	"net/http"
	"time"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

type BookActivityUpdate struct {
	ID             uint64
	Date           time.Time `valid:"required~กรุณาเลือกวัน,after_yesterday~วันจะต้องเป็นตั้งแต่ปัจจุบัน"`
	Time           string
	NumberOfPeople int `valid:"required~กรุณาระบุจำนวนคน,range(1|10)~จำนวนคนต้องอยู่ระหว่าง 1 ถึง 10 คน"`
	Comment        string
	Phone_number   string `valid:"required~กรุณาใส่เบอร์โทรศัพท์, matches(^[0]\\d{9}$)~เบอร์โทรศัพท์ ต้องเริ่มต้นด้วยเลข 0 และให้มีความยาวทั้งหมด 10 หลัก"`
	BookPlanID     uint
	TouristID      uint
	ActivityID     uint
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
		Date:           bookActivity.Date,
		Time:           bookActivity.Time,
		NumberOfPeople: bookActivity.NumberOfPeople,
		Comment:        bookActivity.Comment,
		Phone_number:   bookActivity.Phone_number,

		BookPlanID: bookActivity.BookPlanID,
		BookPlan:   bookPlan,

		TouristID: bookActivity.TouristID,
		Tourist:   tourist,

		ActivityID: bookActivity.ActivityID,
		Activity:   activity,
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
	if err := entity.DB().Preload("BookPlan").Preload("Tourist").Preload("Activity").Raw("SELECT * FROM book_activities WHERE tourist_id = ?", id).Find(&bookActivity).Error; err != nil {
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
	var bookActivitiy BookActivityUpdate

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
	if err := entity.DB().Table("book_activities").Where("id = ?", bookActivitiy.ID).Updates(bookActivitiy).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response updated data
	c.JSON(http.StatusOK, gin.H{"data": "updated your book_activities successfully"})

}
