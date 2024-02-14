package controller

import (
	"net/http"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// POST /payment
func CreatePayment(c *gin.Context) {
	var payment entity.Payment
	var bookPlan entity.BookPlan

	// bind เข้าตัวแปร payment
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct
	if _, err := govalidator.ValidateStruct(payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง payment
	a := entity.Payment{
		Price:       payment.Price,
		Payment_img: payment.Payment_img,

		BookPlanID: payment.BookPlanID,
		BookPlan:   bookPlan,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	entity.DB().Where("id = ?", payment.BookPlanID).First(&bookPlan)
	bookPlan.Payment_status = "ชำระเงินเสร็จสิ้น"
	entity.DB().Save(&bookPlan)

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /payment/:id
func GetPaymentById(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")
	if err := entity.DB().Preload("BookPlan").Raw("SELECT * FROM payments WHERE id = ?", id).Find(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// GET /payment
func GetAllPayment(c *gin.Context) {
	var payment []entity.Payment
	if err := entity.DB().Preload("BookPlan.Planner").
		Preload("BookPlan.Tourist").
		Raw("SELECT * FROM payments").Find(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// DELETE /payment/:id
func DeletePayment(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM payments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payment not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /payment
func UpdatePayment(c *gin.Context) {
	var payment entity.Payment
	var result entity.Payment

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา payment ด้วย id
	if tx := entity.DB().Where("id = ?", payment.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payment not found"})
		return
	}

	if err := entity.DB().Save(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// GET /bookPlan/byTouristId/:id
func GetBookPlanByTouristIdForPayment(c *gin.Context) {
	var bookPlan []entity.BookPlan
	id := c.Param("id")

	if err := entity.DB().Preload("Planner.Destination").
		Preload("Tourist").
		Preload("Room.RoomType").
		Preload("Room.RoomZone").
		Preload("FoodSet").
		Where("tourist_id = ?", id).
		Find(&bookPlan).
		Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bookPlan})
}

// GET /bookPlan/:id
func GetBookPlanByIdForPayment(c *gin.Context) {
	var bookPlan entity.BookPlan
	id := c.Param("id")
	if err := entity.DB().Preload("Planner.Destination").
		Preload("Tourist").
		Preload("Room.RoomType").
		Preload("Room.RoomZone").
		Preload("FoodSet").
		Raw("SELECT * FROM book_plans WHERE id = ?", id).
		Find(&bookPlan).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookPlan})
}

// GET /bookPlan/byTouristId/:id
func GetPaymentByBookplanId(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")

	if err := entity.DB().Preload("BookPlan").
		Where("book_plan_id = ?", id).
		Find(&payment).
		Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payment})
}
