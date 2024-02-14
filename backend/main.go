package main

import (
	"github.com/gin-gonic/gin"

	"github.com/GITTIIII/SE-TEAM11/controller"
	"github.com/GITTIIII/SE-TEAM11/entity"
	middlewares "github.com/GITTIIII/SE-TEAM11/middleware"
)

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	r.POST("/LoginT", controller.LoginTourist)
	r.POST("/LoginE", controller.LoginEmployee)
	r.POST("/Tourist", controller.CreateTourist)
	r.POST("/Employee", controller.CreateEmployee)

	router := r.Group("")
	{
		router.Use(middlewares.Authorizes())
		{
			//Tourist Route
			r.GET("/Tourist", controller.GetAllTourist)
			r.GET("/Tourist/byId/:id", controller.GetTouristById)
			r.PATCH("/Tourist", controller.UpdateTourist)
			r.DELETE("/Tourist/:id", controller.DeleteTourist)

			//Activity Route
			r.GET("/Activity", controller.GetAllActivity)
			r.GET("/Activity/byId/:id", controller.GetActivityById)
			r.POST("/Activity", controller.CreateActivity)
			r.PATCH("/Activity", controller.UpdateActivity)
			r.DELETE("/Activity/:id", controller.DeleteActivity)

			//BookActivity Route
			r.GET("/BookActivity", controller.GetAllBookActivity)
			r.GET("/BookActivity/byId/:id", controller.GetBookActivityById)
			r.GET("/BookActivity/byTouristId/:id", controller.GetAllBookActivityByTouristId)
			r.POST("/BookActivity", controller.CreateBookActivity)
			r.PATCH("/BookActivity", controller.UpdateBookActivity)
			r.DELETE("/BookActivity/:id", controller.DeleteBookActivity)

			//BookPlan Route
			r.GET("/BookPlan/byId/:id", controller.GetBookPlanById)
			r.GET("/BookPlan/byTouristId/:id", controller.GetBookPlanByTouristId)
			r.POST("/BookPlan", controller.CreateBookPlan)
			r.GET("/BookPlan", controller.GetAllBookPlan)
			r.DELETE("/BookPlan/:id", controller.DeleteBookPlan)
			r.PATCH("/CheckInStatus/:id", controller.UpdateCheckInStatus)
			r.GET("/BookPlan/byDate/:date", controller.GetBookPlanByDate)

			//CheckIn Route
			r.GET("/CheckIn", controller.GetAllCheckIn)
			r.GET("/CheckIn/byId/:id", controller.GetCheckInById)
			r.POST("/CheckIn", controller.CreateCheckIn)
			r.PATCH("/CheckIn", controller.UpdateCheckIn)
			r.DELETE("/CheckIn/:id", controller.DeleteCheckIn)

			//Dessert Route
			r.GET("/Dessert", controller.GetAllDessert)
			r.GET("/Dessert/byId/:id", controller.GetDessertById)
			r.POST("/Dessert", controller.CreateDessert)
			r.PATCH("/Dessert", controller.UpdateDessert)
			r.DELETE("/Dessert/:id", controller.DeleteDessert)

			//Destination Route
			r.GET("/Destination", controller.GetAllDestination)
			r.GET("/Destination/byId/:id", controller.GetDestinationById)
			r.POST("/Destination", controller.CreateDestination)
			r.PATCH("/Destination", controller.UpdateDestination)
			r.DELETE("/Destination/:id", controller.DeleteDestination)

			//Drink Route
			r.GET("/Drink", controller.GetAllDrink)
			r.GET("/Drink/byId/:id", controller.GetDrinkById)
			r.POST("/Drink", controller.CreateDrink)
			r.PATCH("/Drink", controller.UpdateDrink)
			r.DELETE("/Drink/:id", controller.DeleteDrink)

			//Employee Route
			r.GET("/Employee", controller.GetAllEmployee)
			r.GET("/Employee/byId/:id", controller.GetEmployeeById)
			r.PATCH("/Employee", controller.UpdateEmployee)
			r.DELETE("/Employee/:id", controller.DeleteEmployee)

			//AreaCode Gender Route
			r.GET("/AreaCode", controller.GetAllAreaCode)
			r.GET("/Gender", controller.GetAllGenders)

			//EmployeeRole Route
			r.GET("/EmployeeRole", controller.GetAllEmployeeRole)
			r.GET("/EmployeeRole/byId/:id", controller.GetEmployeeRoleById)
			r.POST("/EmployeeRole", controller.CreateEmployeeRole)
			r.PATCH("/EmployeeRole", controller.UpdateEmployeeRole)
			r.DELETE("/EmployeeRole/:id", controller.DeleteEmployeeRole)

			//FoodSet Route
			r.GET("/FoodSet", controller.GetAllFoodSet)
			r.GET("/FoodSet/byId/:id", controller.GetFoodSetById)
			r.POST("/FoodSet", controller.CreateFoodSet)
			r.PATCH("/FoodSet", controller.UpdateFoodSet)
			r.DELETE("/FoodSet/:id", controller.DeleteFoodSet)

			//Payment Route
			r.GET("/Payment", controller.GetAllPayment)
			r.GET("/Payment/byId/:id", controller.GetPaymentById)
			r.GET("/Payment/byTouristId/:id", controller.GetBookPlanByTouristIdForPayment)
			r.GET("/Payment/byBookplanId/:id", controller.GetBookPlanByIdForPayment)
			r.GET("/Payment/byBookplanIdForBookplan/:id", controller.GetPaymentByBookplanId)
			r.POST("/Payment", controller.CreatePayment)
			r.PATCH("/Payment", controller.UpdatePayment)
			r.DELETE("/Payment/:id", controller.DeletePayment)

			//Planner Route
			r.GET("/Planner", controller.GetAllPlanner)
			r.GET("/Planner/byId/:id", controller.GetPlannerById)
			r.POST("/Planner", controller.CreatePlanner)
			r.PATCH("/Planner", controller.UpdatePlanner)
			r.DELETE("/Planner/:id", controller.DeletePlanner)

			//PortDestination Route
			r.GET("/PortDestination", controller.GetAllPortDestination)
			r.GET("/PortDestination/byId/:id", controller.GetPortDestinationById)
			r.POST("/PortDestination", controller.CreatePortDestination)
			r.PATCH("/PortDestination", controller.UpdatePortDestination)
			r.DELETE("/PortDestination/:id", controller.DeletePortDestination)

			//Quay
			r.GET("/Quay", controller.GetAllQuay)
			r.GET("/Quay/byId/:id", controller.GetQuayById)
			r.POST("/Quay", controller.CreateQuay)
			r.PATCH("/Quay", controller.UpdateQuay)
			r.DELETE("/Quay/:id", controller.DeleteQuay)

			//PortOrigin Route
			r.GET("/PortOrigin", controller.GetAllPortOrigin)
			r.GET("/PortOrigin/byId/:id", controller.GetPortOriginById)
			r.POST("/PortOrigin", controller.CreatePortOrigin)
			r.PATCH("/PortOrigin", controller.UpdatePortOrigin)
			r.DELETE("/PortOrigin/:id", controller.DeletePortOrigin)

			//Repair Route
			r.GET("/Repair", controller.GetAllRepair)
			r.GET("/Repair/byId/:id", controller.GetRepairById)
			r.POST("/Repair", controller.CreateRepair)
			r.PATCH("/Repair", controller.UpdateRepair)
			r.DELETE("/Repair/:id", controller.DeleteRepair)

			//RepairType Route
			r.GET("/RepairType", controller.GetAllRepairType)
			r.GET("/RepairType/byId/:id", controller.GetRepairTypeById)
			r.POST("/RepairType", controller.CreateRepairType)
			r.PATCH("/RepairType", controller.UpdateRepairType)
			r.DELETE("/RepairType/:id", controller.DeleteRepairType)

			// Review Route
			r.GET("/Review", controller.GetAllReview)
			r.GET("/Review/byId/:id", controller.GetReviewById)
			r.POST("/Review", controller.CreateReview)
			r.PATCH("/Review", controller.UpdateReview)
			r.DELETE("/Review/:id", controller.DeleteReview)

			//Room Route
			r.GET("/Room", controller.GetAllRoom)
			r.GET("/Room/byAva", controller.ListRoom)
			r.GET("/Room/byId/:id", controller.GetRoomById)
			r.POST("/Room", controller.CreateRoom)
			r.PATCH("/Room", controller.UpdateRoom)
			r.DELETE("/Room/:id", controller.DeleteRoom)

			//RoomType Route
			r.GET("/RoomType", controller.GetAllRoomType)
			r.GET("/RoomType/byId/:id", controller.GetRoomTypeById)
			r.POST("/RoomType", controller.CreateRoomType)
			r.PATCH("/RoomType", controller.UpdateRoomType)
			r.DELETE("/RoomType/:id", controller.DeleteRoomType)

			//RoomZone Route
			r.GET("/RoomZone", controller.GetAllRoomZone)
			r.GET("/RoomZone/byId/:id", controller.GetRoomZoneById)
			r.POST("/RoomZone", controller.CreateRoomZone)
			r.PATCH("/RoomZone", controller.UpdateRoomZone)
			r.DELETE("/RoomZone/:id", controller.DeleteRoomZone)

			//Savory Route
			r.GET("/Savory", controller.GetAllSavory)
			r.GET("/Savory/byId/:id", controller.GetSavoryById)
			r.POST("/Savory", controller.CreateSavory)
			r.PATCH("/Savory", controller.UpdateSavory)
			r.DELETE("/Savory/:id", controller.DeleteSavory)

			//Distance Route
			r.GET("/Distance", controller.GetAllDistance)
			r.GET("/Distance/byId/:id", controller.GetDistanceById)
			r.POST("/Distance", controller.CreateDistance)
			r.PATCH("/Distance", controller.UpdateDistance)
			r.DELETE("/Distance/:id", controller.DeleteDistance)
		}
	}

	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
