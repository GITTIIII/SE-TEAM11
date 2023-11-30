package controller

import (
	"net/http"
	"strings"
	"github.com/gin-gonic/gin"
	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/GITTIIII/SE-TEAM11/utils"
)

func responseOK(data interface{}, c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"data": data,
	})
}

func isError(err error, c *gin.Context, message ...string) bool {
	if err != nil {
		msg := err.Error()
		if len(message) > 0 {
			msg = strings.Join(message, "")
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": msg})
		return true
	}
	return false
}

func Login(c *gin.Context) {
	var payload entity.LoginPayload
	var tourist entity.Tourist
	err := c.ShouldBindJSON(&payload)
	if isError(err, c) {
		return
	}
	err = entity.DB().Where("email = ?", payload.Email).First(&tourist).Error
	if isError(err, c) {
		return
	}
	err = utils.VerifyPassword(payload.Password, tourist.Password)
	if isError(err, c, "password not match") {
		return
	}
	err = utils.GenerateJWT(c, tourist.Email, 24)
	if isError(err, c, "token could not be created") {
		return
	}
	responseOK(tourist, c)
}

func LoginEmployee(c *gin.Context) {
	var payload entity.LoginPayload
	var employee entity.Employee
	err := c.ShouldBindJSON(&payload)
	if isError(err, c) {
		return
	}
	err = entity.DB().Where("email = ?", payload.Email).First(&employee).Error
	if isError(err, c) {
		return
	}
	err = utils.VerifyPassword(payload.Password, employee.Employee_password)
	if isError(err, c, "password not match") {
		return
	}
	err = utils.GenerateJWT(c, employee.Employee_email, 24)
	if isError(err, c, "token could not be created") {
		return
	}
	responseOK(employee, c)
}
