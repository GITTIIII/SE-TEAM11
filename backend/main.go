package main

import (
	"github.com/gin-gonic/gin"

	"github.com/GITTIIII/SE-TEAM11/entity"
)


func main() {

entity.SetupDatabase()

r := gin.Default()

r.Run()

}