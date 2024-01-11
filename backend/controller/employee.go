package controller

import (
	"net/http"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// POST /employee
func CreateEmployee(c *gin.Context) {
	var employee entity.Employee
	var employeeRole entity.EmployeeRole

	// bind เข้าตัวแปร employee
	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//hashpassword
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(employee.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hash password"})
		return
	}

	// สร้าง employee
	a := entity.Employee{
		Name:     employee.Name,
		Tel:      employee.Tel,
		Email:    employee.Email,
		Picture:  employee.Picture,
		Password: string(hashPassword),
		Gender:   employee.Gender,

		EmployeeRoleID: employee.EmployeeRoleID,
		EmployeeRole:   employeeRole,
	}
	// validate
	if _, err := govalidator.ValidateStruct(employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// บันทึก
	if err := entity.DB().Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": a})
}

// GET /employee/:id
func GetEmployeeById(c *gin.Context) {
	var employee entity.Employee
	id := c.Param("id")
	if err := entity.DB().Preload("EmployeeRole").Raw("SELECT * FROM employees WHERE id = ?", id).Find(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// GET /employee
func GetAllEmployee(c *gin.Context) {
	var employee []entity.Employee
	if err := entity.DB().Preload("EmployeeRole").Raw("SELECT * FROM employees").Find(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// DELETE /employee/:id
func DeleteEmployee(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM employees WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /employee
func UpdateEmployee(c *gin.Context) {
	var employee entity.Employee
	var result entity.Employee

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", employee.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}

	if err := entity.DB().Save(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}
