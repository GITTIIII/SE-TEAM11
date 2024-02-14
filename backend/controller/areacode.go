package controller

import (
	"net/http"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/gin-gonic/gin"
)

// GET /genders
func GetAllAreaCode(c *gin.Context) {
	var areaCode []entity.AreaCode
	if err := entity.DB().Raw("SELECT * FROM area_codes").Find(&areaCode).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": areaCode})
}
