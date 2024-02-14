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
	var roomType entity.RoomType
	var roomZone entity.RoomZone
	var employee entity.Employee

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

// GET /room/byAva
func ListRoom(c *gin.Context) {
	var room []entity.Room
	if err := entity.DB().Where("Status = ?", "ว่าง").Find(&room).Error; err != nil {
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

type RoomUpdate struct {
	ID          uint64
	Room_number string `gorm:"uniqueIndex" valid:"required~ต้องระบุหมายเลขห้องพัก, matches(^[SDET][0-9]{4}[sgp]$)~เลขห้องพักต้องขึ้นต้นด้วย SEDT ตามด้วยตัวเลข 4 ตัว และลงท้ายด้วย sgp"`
	Room_img    string
	Room_price  float64 `valid:"required~ต้องระบุราคาของห้องพัก, range(10000|100000)~ราคาของห้องพักต้องอยู่ระหว่าง 10000-100000"`
	RoomTypeID  uint
	RoomZoneID  uint
	EmployeeID  uint
}

// PATCH /room
func UpdateRoom(c *gin.Context) {
	var room RoomUpdate

	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//validate struct
	if _, err := govalidator.ValidateStruct(room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// update data in database and check error
	if err := entity.DB().Table("rooms").Where("id = ?", room.ID).Updates(room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response updated data
	c.JSON(http.StatusOK, gin.H{"data": "updated your repairs successfully"})
}
