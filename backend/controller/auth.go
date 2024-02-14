package controller

import (
	"net/http"

	"github.com/GITTIIII/SE-TEAM11/entity"
	service "github.com/GITTIIII/SE-TEAM11/services"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type LoginPayload struct {
	Email    string `json:"email"` //set varible email
	Password string `json:"password"`
}

// logintoken response
type LoginResponse struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
}

// get info from tourist email and password
func LoginTourist(c *gin.Context) {
	var payload LoginPayload
	var tourist entity.Tourist

	if error := c.ShouldBindJSON(&payload); error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": error})
		return
	}

	// find tourist from email
	if error := entity.DB().Raw("SELECT * FROM tourists WHERE Email = ?", payload.Email).Scan(&tourist).Error; error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email not found"})
		return
	}

	//check password
	err := bcrypt.CompareHashAndPassword([]byte(tourist.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "wrong email or password incorrect"})
		return
	}

	//format token
	jwtWrapper := service.JwtWrapper{
		SecretKey:       "ABC",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(tourist.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error generating token"})
		return
	}

	tokenResponse := LoginResponse{
		Token: signedToken,
		ID:    tourist.ID,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

func LoginEmployee(c *gin.Context) {
	var payload LoginPayload
	var employee entity.Employee

	if error := c.ShouldBindJSON(&payload); error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": error})
		return
	}

	// find tourist from email
	if error := entity.DB().Raw("SELECT * FROM employees WHERE Email = ?", payload.Email).Scan(&employee).Error; error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email not found"})
		return
	}

	//check password
	err := bcrypt.CompareHashAndPassword([]byte(employee.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password incorrect"})
		return
	}

	//format token
	jwtWrapper := service.JwtWrapper{
		SecretKey:       "ABC",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(employee.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error generating token"})
		return
	}

	tokenResponse := LoginResponse{
		Token: signedToken,
		ID:    employee.ID,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}
