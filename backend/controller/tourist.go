package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/GITTIIII/SE-TEAM11/entity"
	"golang.org/x/crypto/bcrypt"
)

// POST /tourist
func CreateTourist(c *gin.Context) {
	var tourist entity.Tourist
	
	// bind เข้าตัวแปร tourist
	if err := c.ShouldBindJSON(&tourist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//hashpassword
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(tourist.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hash password"})
		return
	}

	// สร้าง tourist
	a := entity.Tourist{
		Email: tourist.Email,
		Password: string(hashPassword),
		Tourist_name: tourist.Tourist_name,
		Phone: tourist.Phone,
		Age: tourist.Age,
		Picture: tourist.Picture,
		Gender: tourist.Gender,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /tourist/:id
func GetTouristById(c *gin.Context) {
	var tourist entity.Tourist
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM tourists WHERE id = ?", id).Find(&tourist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": tourist})
}

// GET /tourist
func GetAllTourist(c *gin.Context) {
	var tourist []entity.Tourist
	if err := entity.DB().Raw("SELECT * FROM tourists").Find(&tourist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": tourist})
}

// DELETE /tourist/:id
func DeleteTourist(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM tourists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tourist not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /tourist
func UpdateTourist(c *gin.Context) {
	var tourist entity.Tourist
	var result entity.Tourist

	if err := c.ShouldBindJSON(&tourist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา tourist ด้วย id
	if tx := entity.DB().Where("id = ?", tourist.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tourist not found"})
		return
	}

	if err := entity.DB().Save(&tourist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": tourist})
}