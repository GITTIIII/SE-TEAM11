package unit_test

import (
	"testing"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestFoodValidation(t *testing.T) {
	SavoryID := uint(1)
	DrinkID := uint(1)
	DessertID := uint(1)

	g := NewGomegaWithT(t)

	t.Run(`food check pass`, func(t *testing.T) {
		foodSet := entity.FoodSet{
			Name:      "test01",
			Count:     15,
			SavoryID:  &SavoryID,
			DrinkID:   &DrinkID,
			DessertID: &DessertID,
		}

		ok, err := govalidator.ValidateStruct(foodSet)

		if !ok {
			t.Errorf("Validation failed with error: %v", err)
		}
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run(`foodSet Name is required`, func(t *testing.T) {
		foodSet := entity.FoodSet{
			Name:      "",
			Count:     15,
			SavoryID:  &SavoryID,
			DrinkID:   &DrinkID,
			DessertID: &DessertID,
		}

		ok, err := govalidator.ValidateStruct(foodSet)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Name is required"))
	})
	t.Run(`foodSet Count is required`, func(t *testing.T) {
		foodSet := entity.FoodSet{
			Name:      "test03",
			Count:     0,
			SavoryID:  &SavoryID,
			DrinkID:   &DrinkID,
			DessertID: &DessertID,
		}

		ok, err := govalidator.ValidateStruct(foodSet)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Count is required"))

	})
	t.Run(`foodSet Count Upper 9999`, func(t *testing.T) {
		foodSet := entity.FoodSet{
			Name:      "test04",
			Count:     10000,
			SavoryID:  &SavoryID,
			DrinkID:   &DrinkID,
			DessertID: &DessertID,
		}

		ok, err := govalidator.ValidateStruct(foodSet)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Count must be between 1 and 9999"))

	})
	t.Run(`foodSet Count Lower 9999`, func(t *testing.T) {
		foodSet := entity.FoodSet{
			Name:      "test05",
			Count:     -1,
			SavoryID:  &SavoryID,
			DrinkID:   &DrinkID,
			DessertID: &DessertID,
		}

		ok, err := govalidator.ValidateStruct(foodSet)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Count must be between 1 and 9999"))

	})

	t.Run(`foodSet Name Lower 2`, func(t *testing.T) {
		foodSet := entity.FoodSet{
			Name:      "t",
			Count:     10,
			SavoryID:  &SavoryID,
			DrinkID:   &DrinkID,
			DessertID: &DessertID,
		}

		ok, err := govalidator.ValidateStruct(foodSet)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Name must be between 2 and 10 characters"))

	})
	t.Run(`foodSet Name Upper 10`, func(t *testing.T) {
		foodSet := entity.FoodSet{
			Name:      "zxcvbnmasdf",
			Count:     10,
			SavoryID:  &SavoryID,
			DrinkID:   &DrinkID,
			DessertID: &DessertID,
		}

		ok, err := govalidator.ValidateStruct(foodSet)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Name must be between 2 and 10 characters"))

	})

}
func TestSavoryValidation(t *testing.T) {

	g := NewGomegaWithT(t)
	t.Run(`Savory check pass`, func(t *testing.T) {
		savory := entity.Savory{
			Name:  "test01",
			Count: 15,
		}

		ok, err := govalidator.ValidateStruct(savory)

		if !ok {
			t.Errorf("Validation failed with error: %v", err)
		}
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run(`Savory Name is required`, func(t *testing.T) {
		savory := entity.Savory{
			Name:  "",
			Count: 10,
		}

		ok, err := govalidator.ValidateStruct(savory)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Name is required"))

	})

	t.Run(`Savory Count is required`, func(t *testing.T) {
		savory := entity.Savory{
			Name:  "test02",
			Count: 0,
		}

		ok, err := govalidator.ValidateStruct(savory)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Count is required"))

	})
	t.Run(`Savory Count Upper 9999`, func(t *testing.T) {
		savory := entity.Savory{
			Name:  "test03",
			Count: 10000,
		}

		ok, err := govalidator.ValidateStruct(savory)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Count must be between 1 and 9999"))

	})

	t.Run(`Savory Count Lower 1`, func(t *testing.T) {
		savory := entity.Savory{
			Name:  "test04",
			Count: -1,
		}

		ok, err := govalidator.ValidateStruct(savory)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Count must be between 1 and 9999"))

	})

	t.Run(`Savory Name Upper 10`, func(t *testing.T) {
		savory := entity.Savory{
			Name:  "test0000003",
			Count: 15,
		}

		ok, err := govalidator.ValidateStruct(savory)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Name must be between 2 and 10 characters"))

	})

	t.Run(`Savory Name Lower 2`, func(t *testing.T) {
		savory := entity.Savory{
			Name:  "t",
			Count: 15,
		}

		ok, err := govalidator.ValidateStruct(savory)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Name must be between 2 and 10 characters"))

	})
}

func TestDessertValidation(t *testing.T) {

	g := NewGomegaWithT(t)
	t.Run(`Dessert check pass`, func(t *testing.T) {
		dessert := entity.Dessert{
			Name:  "test01",
			Count: 15,
		}

		ok, err := govalidator.ValidateStruct(dessert)

		if !ok {
			t.Errorf("Validation failed with error: %v", err)
		}
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run(`Dessert Name is required`, func(t *testing.T) {
		dessert := entity.Dessert{
			Name:  "",
			Count: 10,
		}

		ok, err := govalidator.ValidateStruct(dessert)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Name is required"))

	})

	t.Run(`Dessert Count is required`, func(t *testing.T) {
		dessert := entity.Dessert{
			Name:  "test02",
			Count: 0,
		}

		ok, err := govalidator.ValidateStruct(dessert)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Count is required"))

	})
	t.Run(`Dessert Count Upper 9999`, func(t *testing.T) {
		dessert := entity.Dessert{
			Name:  "test03",
			Count: 10000,
		}

		ok, err := govalidator.ValidateStruct(dessert)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Count must be between 1 and 9999"))

	})

	t.Run(`Dessert Count Lower 1`, func(t *testing.T) {
		dessert := entity.Dessert{
			Name:  "test04",
			Count: -1,
		}

		ok, err := govalidator.ValidateStruct(dessert)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Count must be between 1 and 9999"))

	})

	t.Run(`Dessert Name Upper 10`, func(t *testing.T) {
		dessert := entity.Dessert{
			Name:  "test0000003",
			Count: 15,
		}

		ok, err := govalidator.ValidateStruct(dessert)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Name must be between 2 and 10 characters"))

	})

	t.Run(`Dessert Name Lower 2`, func(t *testing.T) {
		dessert := entity.Dessert{
			Name:  "t",
			Count: 15,
		}

		ok, err := govalidator.ValidateStruct(dessert)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Name must be between 2 and 10 characters"))

	})
}

func TestDrinkValidation(t *testing.T) {

	g := NewGomegaWithT(t)
	t.Run(`Drink check pass`, func(t *testing.T) {
		drink := entity.Drink{
			Name:  "test01",
			Count: 15,
		}

		ok, err := govalidator.ValidateStruct(drink)

		if !ok {
			t.Errorf("Validation failed with error: %v", err)
		}
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run(`Drink Name is required`, func(t *testing.T) {
		drink := entity.Drink{
			Name:  "",
			Count: 10,
		}

		ok, err := govalidator.ValidateStruct(drink)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Name is required"))

	})

	t.Run(`Drink Count is required`, func(t *testing.T) {
		drink := entity.Drink{
			Name:  "test02",
			Count: 0,
		}

		ok, err := govalidator.ValidateStruct(drink)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Count is required"))

	})
	t.Run(`Drink Count Upper 9999`, func(t *testing.T) {
		drink := entity.Drink{
			Name:  "test03",
			Count: 10000,
		}

		ok, err := govalidator.ValidateStruct(drink)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Count must be between 1 and 9999"))

	})

	t.Run(`Drink Count Lower 1`, func(t *testing.T) {
		drink := entity.Drink{
			Name:  "test04",
			Count: -1,
		}

		ok, err := govalidator.ValidateStruct(drink)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Count must be between 1 and 9999"))

	})

	t.Run(`Drink Name Upper 10`, func(t *testing.T) {
		drink := entity.Drink{
			Name:  "test0000003",
			Count: 15,
		}

		ok, err := govalidator.ValidateStruct(drink)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Name must be between 2 and 10 characters"))

	})

	t.Run(`Drink Name Lower 2`, func(t *testing.T) {
		drink := entity.Drink{
			Name:  "t",
			Count: 15,
		}

		ok, err := govalidator.ValidateStruct(drink)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Name must be between 2 and 10 characters"))

	})
}
