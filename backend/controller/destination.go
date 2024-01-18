package controller

import (
	"net/http"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// POST /destination
func CreateDestination(c *gin.Context) {
	var destination entity.Destination
	var portOrigin entity.PortOrigin
	var portDestination entity.PortDestination
	var Distance entity.Distance

	// bind เข้าตัวแปร destination
	if err := c.ShouldBindJSON(&destination); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	// validation
	}
	if _, err := govalidator.ValidateStruct(destination); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// สร้าง destination
	a := entity.Destination{
		Destination_img:    destination.Destination_img,
		Destination_name: destination.Destination_name,
		Destination_price: destination.Destination_price,
		PortOriginID: destination.PortOriginID,
		PortOrigin: portOrigin,

		PortDestinationID: destination.PortDestinationID,
		PortDestination: portDestination,

		DistanceID: destination.DistanceID,
		Distance: Distance,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /destination/:id
func GetDestinationById(c *gin.Context) {
	var destination entity.Destination
	id := c.Param("id")
	if err := entity.DB().Preload("PortOrigin").Preload("PortDestination").Preload("Distance").Raw("SELECT * FROM destinations WHERE id = ?", id).Find(&destination).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": destination})
}

// GET /destination
func GetAllDestination(c *gin.Context) {
	var destination []entity.Destination
	if err := entity.DB().Preload("PortOrigin").Preload("PortDestination").Preload("Distance").Raw("SELECT * FROM destinations").Find(&destination).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": destination})
}

// DELETE /destination/:id
func DeleteDestination(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM destinations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Destination not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /destination
func UpdateDestination(c *gin.Context) {
	var destination entity.Destination
	var result entity.Destination

	if err := c.ShouldBindJSON(&destination); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา destination ด้วย id
	if tx := entity.DB().Where("id = ?", destination.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Destination not found"})
		return
	}

	if err := entity.DB().Save(&destination).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": destination})
}