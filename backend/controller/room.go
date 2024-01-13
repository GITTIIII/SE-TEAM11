package controller

import (
	"net/http"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// POST /room
func CreateRoom(c *gin.Context) {
	var room entity.Room

	// bind เข้าตัวแปร room
	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct
    if _, err := govalidator.ValidateStruct(room); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

	db, err := entity.SetupDatabase()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var roomType entity.RoomType
	db.First(&roomType, room.RoomTypeID)
	if roomType.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "roomType not found"})
		return
	}

	var roomZone entity.RoomZone
	db.First(&roomZone, room.RoomZoneID)
	if roomZone.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "roomZone not found"})
		return
	}

	var employee entity.Employee
	db.First(&employee, room.EmployeeID)
	if employee.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "employee not found"})
		return
	}

	// สร้าง room
	a := entity.Room{
		Room_number: room.Room_number,
		Room_img:    room.Room_img,
		Status:      "ว่าง",
		Room_price:  room.Room_price,

		RoomTypeID: room.RoomTypeID,
		RoomType:   roomType,

		RoomZoneID: room.RoomZoneID,
		RoomZone:   roomZone,

		EmployeeID: room.EmployeeID,
		Employee:   employee,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /room/:id
func GetRoomById(c *gin.Context) {
	var room entity.Room
	id := c.Param("id")
	if err := entity.DB().Preload("RoomType").Preload("RoomZone").Preload("Employee").Raw("SELECT * FROM rooms WHERE id = ?", id).Find(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room})
}

// GET /room
func GetAllRoom(c *gin.Context) {
	var room []entity.Room
	if err := entity.DB().Preload("RoomType").Preload("RoomZone").Preload("Employee").Raw("SELECT * FROM rooms").Find(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room})
}

// DELETE /room/:id
func DeleteRoom(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM rooms WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /room
func UpdateRoom(c *gin.Context) {
	var room entity.Room
	var result entity.Room

	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", room.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room not found"})
		return
	}

	if err := entity.DB().Save(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room})
}
