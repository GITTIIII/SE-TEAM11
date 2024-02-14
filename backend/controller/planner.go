package controller

import (
	"net/http"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// POST /planner
func CreatePlanner(c *gin.Context) {
	var planner entity.Planner
	var destination entity.Destination
	var employee entity.Employee
	var quay entity.Quay

	// bind เข้าตัวแปร planner
	if err := c.ShouldBindJSON(&planner); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if _, err := govalidator.ValidateStruct(planner); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง planner
	a := entity.Planner{
		TimeStart:      planner.TimeStart,
		Plan_name:      planner.Plan_name,
		Plan_img:       planner.Plan_img,
		Plan_price:     planner.Plan_price,
		Planner_status: planner.Planner_status,

		DestinationID: planner.DestinationID,
		Destination:   destination,

		EmployeeID: planner.EmployeeID,
		Employee:   employee,

		QuayID: planner.QuayID,
		Quay:   quay,
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
	if err := entity.DB().Preload("Destination").Preload("Quay").Raw("SELECT * FROM planners").Find(&planner).Error; err != nil {
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
	if _, err := govalidator.ValidateStruct(planner); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&planner).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": planner})
}
