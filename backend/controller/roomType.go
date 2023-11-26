package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/GITTIIII/SE-TEAM11/entity"
)

// POST /roomType
func CreateRoomType(c *gin.Context) {
	var roomType entity.RoomType

	// bind เข้าตัวแปร roomType
	if err := c.ShouldBindJSON(&roomType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง roomType
	a := entity.RoomType{
		RoomType_name: roomType.RoomType_name,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /roomType/:id
func GetRoomTypeById(c *gin.Context) {
	var roomType entity.RoomType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM room_types WHERE id = ?", id).Find(&roomType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roomType})
}

// GET /roomType
func GetAllRoomType(c *gin.Context) {
	var roomType []entity.RoomType
	if err := entity.DB().Raw("SELECT * FROM room_types").Find(&roomType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roomType})
}

// DELETE /roomType/:id
func DeleteRoomType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM room_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RoomType not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /roomType
func UpdateRoomType(c *gin.Context) {
	var roomType entity.RoomType
	var result entity.RoomType

	if err := c.ShouldBindJSON(&roomType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา roomType ด้วย id
	if tx := entity.DB().Where("id = ?", roomType.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RoomType not found"})
		return
	}

	if err := entity.DB().Save(&roomType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roomType})
}