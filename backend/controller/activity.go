package controller

import (
	"net/http"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// POST /activity
func CreateActivity(c *gin.Context) {
	var activity entity.Activity
	
	// bind เข้าตัวแปร activity
	if err := c.ShouldBindJSON(&activity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(activity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Activity
	a := entity.Activity{
		Activity_name: activity.Activity_name,
		Activity_img: activity.Activity_img,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /activity/:id
func GetActivityById(c *gin.Context) {
	var activity entity.Activity
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM activities WHERE id = ?", id).Find(&activity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": activity})
}

// GET /activity
func GetAllActivity(c *gin.Context) {
	var activity []entity.Activity
	if err := entity.DB().Raw("SELECT * FROM activities").Find(&activity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": activity})
}

// DELETE /activity/:id
func DeleteActivity(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM activities WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Activity not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /activity
func UpdateActivity(c *gin.Context) {
	var activity entity.Activity
	var result entity.Activity

	if err := c.ShouldBindJSON(&activity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา activity ด้วย id
	if tx := entity.DB().Where("id = ?", activity.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Activity not found"})
		return
	}

	if err := entity.DB().Save(&activity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": activity})
}