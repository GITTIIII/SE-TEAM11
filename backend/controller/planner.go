package controller

import (
	"net/http"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/gin-gonic/gin"
)

// POST /planner
func CreatePlanner(c *gin.Context) {
	var planner entity.Planner
	var destination entity.Destination

	// bind เข้าตัวแปร planner
	if err := c.ShouldBindJSON(&planner); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง planner
	a := entity.Planner{
		Plan_img:    planner.Plan_img,
		Plan_name: planner.Plan_name,
		Price: planner.Price,
		// TimeStart: planner.TimeStart,
		// TimeEnd: planner.TimeEnd,
		DestinationID: planner.DestinationID,
		Destination: destination,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /planner/:id
func GetPlannerById(c *gin.Context) {
	var planner entity.Planner
	id := c.Param("id")
	if err := entity.DB().Preload("Destination").Raw("SELECT * FROM planners WHERE id = ?", id).Find(&planner).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": planner})
}

// GET /planner
func GetAllPlanner(c *gin.Context) {
	var planner []entity.Planner
	if err := entity.DB().Preload("Destination").Raw("SELECT * FROM planners").Find(&planner).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": planner})
}

// DELETE /planner/:id
func DeletePlanner(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM planners WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Planner not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /planner
func UpdatePlanner(c *gin.Context) {
	var planner entity.Planner
	var result entity.Planner

	if err := c.ShouldBindJSON(&planner); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา planner ด้วย id
	if tx := entity.DB().Where("id = ?", planner.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Planner not found"})
		return
	}

	if err := entity.DB().Save(&planner).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": planner})
}