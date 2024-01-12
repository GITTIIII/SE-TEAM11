package controller

import (
	"net/http"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/gin-gonic/gin"
)

// POST /portDestination
func CreatePortDestination(c *gin.Context) {
	var portDestination entity.PortDestination
	

	// bind เข้าตัวแปร portDestination
	if err := c.ShouldBindJSON(&portDestination); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง portDestination
	a := entity.PortDestination{
		PortDestination_name: portDestination.PortDestination_name,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /portDestination/:id
func GetPortDestinationById(c *gin.Context) {
	var portDestination entity.PortDestination
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM port_destinations WHERE id = ?", id).Find(&portDestination).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": portDestination})
}

// GET /portDestination
func GetAllPortDestination(c *gin.Context) {
	var portDestination []entity.PortDestination
	if err := entity.DB().Raw("SELECT * FROM port_destinations").Find(&portDestination).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": portDestination})
}

// DELETE /portDestination/:id
func DeletePortDestination(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM port_destinations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PortDestination not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /portDestination
func UpdatePortDestination(c *gin.Context) {
	var portDestination entity.PortDestination
	var result entity.PortDestination

	if err := c.ShouldBindJSON(&portDestination); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา portDestination ด้วย id
	if tx := entity.DB().Where("id = ?", portDestination.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PortDestination not found"})
		return
	}

	if err := entity.DB().Save(&portDestination).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": portDestination})
}