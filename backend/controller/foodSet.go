package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/GITTIIII/SE-TEAM11/entity"
)
// POST /foodSet
func CreateFoodSet(c *gin.Context)  {
	var foodSet entity.FoodSet
	
	if err := c.ShouldBindJSON(&foodSet); err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	
	return
	
	}
	
	if err := entity.DB().Create(&foodSet).Error; err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	
	return
	
	}
	
	c.JSON(http.StatusOK, gin.H{"data": foodSet})
	
}

// GET /foodSet 
func GetAllFoodSet(c *gin.Context) {
	var foodSets []entity.FoodSet
	if err := entity.DB().Preload("Dessert").Preload("Drink").Preload("Savory").Raw("SELECT * FROM food_Sets").Find(&foodSets).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": foodSets})
}

// DELETE /foodSet/:id
func DeleteFoodSet(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM food_Sets WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "foodSet not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /foodSet
func UpdateFoodSet(c *gin.Context) {
	var foodSet entity.FoodSet
	var result entity.FoodSet

	if err := c.ShouldBindJSON(&foodSet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if fs := entity.DB().Where("id = ?", foodSet.ID).First(&result); fs.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "foodSet not found"})
		return
	}

	if err := entity.DB().Save(&foodSet).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": foodSet})
}


// GET /foodSet/:id

func GetFoodSetById(c *gin.Context) {

	var foodSet entity.FoodSet

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM food_Sets WHERE id = ?", id).Scan(&foodSet).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": foodSet})

}
//-------------------------------------------------------------------------------------------------
// POST /savory
func CreateSavory(c *gin.Context) {
	var savory entity.Savory
	
	if err := c.ShouldBindJSON(&savory); err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	
	return
	
	}
	
	if err := entity.DB().Create(&savory).Error; err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	
	return
	
	}
	c.JSON(http.StatusOK, gin.H{"data": savory})
} 


// GET /savory
func GetAllSavory(c *gin.Context) {
	var savories []entity.Savory
	if err := entity.DB().Raw("SELECT * FROM savories").Find(&savories).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": savories})
}

// DELETE /savory/:id
func DeleteSavory(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM savories WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "savory not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /savory
func UpdateSavory(c *gin.Context) {
	var savory entity.Savory
	var result entity.Savory

	if err := c.ShouldBindJSON(&savory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if fs := entity.DB().Where("id = ?", savory.ID).First(&result); fs.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "savory not found"})
		return
	}

	if err := entity.DB().Save(&savory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": savory})
}

// GET /savory/:id

func GetSavoryById(c *gin.Context) {

	var savory entity.Savory

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM savories WHERE id = ?", id).Scan(&savory).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": savory})

}
//-----------------------------------------------------------------------------------------
// POST /dessert
func CreateDessert(c *gin.Context) {
	var dessert entity.Dessert
	
	if err := c.ShouldBindJSON(&dessert); err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	
	return
	
	}
	
	if err := entity.DB().Create(&dessert).Error; err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	
	return
	
	}
	c.JSON(http.StatusOK, gin.H{"data": dessert})
} 


// GET /dessert 
func GetAllDessert(c *gin.Context) {
	var desserts []entity.Dessert
	if err := entity.DB().Raw("SELECT * FROM desserts").Find(&desserts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": desserts})
}

// DELETE /dessert/:id
func DeleteDessert(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM desserts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dessert not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /dessert
func UpdateDessert(c *gin.Context) {
	var dessert entity.Dessert
	var result entity.Dessert

	if err := c.ShouldBindJSON(&dessert); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if fs := entity.DB().Where("id = ?", dessert.ID).First(&result); fs.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dessert not found"})
		return
	}

	if err := entity.DB().Save(&dessert).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dessert})
}

// GET /dessert/:id

func GetDessertById(c *gin.Context) {

	var dessert entity.Dessert

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM desserts WHERE id = ?", id).Scan(&dessert).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": dessert})

}
//-----------------------------------------------------------------------------------------
// POST /drink
func CreateDrink(c *gin.Context) {
	var drink entity.Drink
	
	if err := c.ShouldBindJSON(&drink); err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	
	return
	
	}
	
	if err := entity.DB().Create(&drink).Error; err != nil {
	
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	
	return
	
	}
	c.JSON(http.StatusOK, gin.H{"data": drink})
} 


// GET /drink
func GetAllDrink(c *gin.Context) {
	var drinks []entity.Drink
	if err := entity.DB().Raw("SELECT * FROM drinks").Find(&drinks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": drinks})
}

// DELETE /drink/:id
func DeleteDrink(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM drinks WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "drink not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /drink
func UpdateDrink(c *gin.Context) {
	var drink entity.Drink
	var result entity.Drink

	if err := c.ShouldBindJSON(&drink); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if fs := entity.DB().Where("id = ?", drink.ID).First(&result); fs.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "drink not found"})
		return
	}

	if err := entity.DB().Save(&drink).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": drink})
}

// GET /drink/:id

func GetDrinkById(c *gin.Context) {

	var drink entity.Drink

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM drinks WHERE id = ?", id).Scan(&drink).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": drink})

}


