package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/GITTIIII/SE-TEAM11/entity"
)

// POST /portOrigin
func CreatePortOrigin(c *gin.Context) {
	var portOrigin entity.PortOrigin
	

	// bind เข้าตัวแปร portOrigin
	if err := c.ShouldBindJSON(&portOrigin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง portOrigin
	a := entity.PortOrigin{
		PortOrigin_name: portOrigin.PortOrigin_name,
		Place: portOrigin.Place,
		Country: portOrigin.Country,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /portOrigin/:id
func GetPortOriginById(c *gin.Context) {
	var portOrigin entity.PortOrigin
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM port_origins WHERE id = ?", id).Find(&portOrigin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": portOrigin})
}

// GET /portOrigin
func GetAllPortOrigin(c *gin.Context) {
	var portOrigin []entity.PortOrigin
	if err := entity.DB().Raw("SELECT * FROM port_origins").Find(&portOrigin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": portOrigin})
}

// DELETE /portOrigin/:id
func DeletePortOrigin(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM port_origins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PortOrigin not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /portOrigin
func UpdatePortOrigin(c *gin.Context) {
	var portOrigin entity.PortOrigin
	var result entity.PortOrigin

	if err := c.ShouldBindJSON(&portOrigin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา portOrigin ด้วย id
	if tx := entity.DB().Where("id = ?", portOrigin.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PortOrigin not found"})
		return
	}

	if err := entity.DB().Save(&portOrigin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": portOrigin})
}