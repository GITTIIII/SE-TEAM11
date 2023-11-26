package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/GITTIIII/SE-TEAM11/entity"
)

// POST /employeeRole
func CreateEmployeeRole(c *gin.Context) {
	var employeeRole entity.EmployeeRole
	
	// bind เข้าตัวแปร employeeRole
	if err := c.ShouldBindJSON(&employeeRole); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง employeeRole
	a := entity.EmployeeRole{
		Name:employeeRole.Name,
		Role:employeeRole.Role,
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /employeeRole/:id
func GetEmployeeRoleById(c *gin.Context) {
	var employeeRole entity.EmployeeRole
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM employee_roles WHERE id = ?", id).Find(&employeeRole).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employeeRole})
}

// GET /employeeRole
func GetAllEmployeeRole(c *gin.Context) {
	var employeeRole []entity.EmployeeRole
	if err := entity.DB().Raw("SELECT * FROM employee_roles").Find(&employeeRole).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employeeRole})
}

// DELETE /employeeRole/:id
func DeleteEmployeeRole(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM employee_roles WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /employeeRole
func UpdateEmployeeRole(c *gin.Context) {
	var employeeRole entity.EmployeeRole
	var result entity.EmployeeRole

	if err := c.ShouldBindJSON(&employeeRole); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา employeeRole ด้วย id
	if tx := entity.DB().Where("id = ?", employeeRole.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employeeRole not found"})
		return
	}

	if err := entity.DB().Save(&employeeRole).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employeeRole})
}