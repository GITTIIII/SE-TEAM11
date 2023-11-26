package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/GITTIIII/SE-TEAM11/entity"
)

// POST /roomZone
func CreateRoomZone(c *gin.Context) {
	var roomZone entity.RoomZone

	// bind เข้าตัวแปร roomZone
	if err := c.ShouldBindJSON(&roomZone); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง roomZone
	a := entity.RoomZone{
		RoomZone_name: roomZone.RoomZone_name,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /roomZone/:id
func GetRoomZoneById(c *gin.Context) {
	var roomZone entity.RoomZone
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM room_zones WHERE id = ?", id).Find(&roomZone).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roomZone})
}

// GET /roomZone
func GetAllRoomZone(c *gin.Context) {
	var roomZone []entity.RoomZone
	if err := entity.DB().Raw("SELECT * FROM room_zones").Find(&roomZone).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roomZone})
}

// DELETE /roomZone/:id
func DeleteRoomZone(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM room_zones WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RoomZone not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /roomZone
func UpdateRoomZone(c *gin.Context) {
	var roomZone entity.RoomZone
	var result entity.RoomZone

	if err := c.ShouldBindJSON(&roomZone); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา roomZone ด้วย id
	if tx := entity.DB().Where("id = ?", roomZone.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RoomZone not found"})
		return
	}

	if err := entity.DB().Save(&roomZone).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": roomZone})
}