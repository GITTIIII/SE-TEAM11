package unit_test

import (
	"fmt"
	"testing"
	"time"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestUserBookActivityValidation(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`valid bookactivity`, func(t *testing.T) {
		bookActivity := entity.BookActivity{
			Date:           time.Now(),
			Time:           "8.00-10.00",
			NumberOfPeople: 5,
			Comment:        "test",
			Phone_number:   "0123456789",
			BookPlanID:     1,
			TouristID:      1,
			ActivityID:     1,
		}

		ok, err := govalidator.ValidateStruct(bookActivity)

		if !ok {
			t.Errorf("Validation failed with error: %v", err)
		}
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run(`เบอร์โทรศัพท์ ต้องเริ่มต้นด้วยเลข 0 และให้มีความยาวทั้งหมด 10 หลัก`, func(t *testing.T) {
		bookActivity := entity.BookActivity{
			Date:           time.Now(),
			Time:           "8.00-10.00",
			NumberOfPeople: 5,
			Comment:        "test",
			Phone_number:   "111111111111111111111",
			BookPlanID:     1,
			TouristID:      1,
			ActivityID:     1,
		}

		ok, err := govalidator.ValidateStruct(bookActivity)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal(fmt.Sprintf("เบอร์โทรศัพท์ ต้องเริ่มต้นด้วยเลข 0 และให้มีความยาวทั้งหมด 10 หลัก")))

	})

	t.Run(`กรุณาใส่เบอร์โทรศัพท์`, func(t *testing.T) {
		bookActivity := entity.BookActivity{
			Date:           time.Now(),
			Time:           "8.00-10.00",
			NumberOfPeople: 5,
			Comment:        "test",
			Phone_number:   "",
			BookPlanID:     1,
			TouristID:      1,
			ActivityID:     1,
		}

		ok, err := govalidator.ValidateStruct(bookActivity)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณาใส่เบอร์โทรศัพท์"))

	})

	t.Run(`จำนวนคนต้องอยู่ระหว่าง 1 ถึง 10 คน`, func(t *testing.T) {
		bookActivity := entity.BookActivity{
			Date:           time.Now(),
			Time:           "8.00-10.00",
			NumberOfPeople: 11,
			Comment:        "test",
			Phone_number:   "0123456789",
			BookPlanID:     1,
			TouristID:      1,
			ActivityID:     1,
		}

		ok, err := govalidator.ValidateStruct(bookActivity)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("จำนวนคนต้องอยู่ระหว่าง 1 ถึง 10 คน"))
	})

	t.Run(`กรุณาระบุจำนวนคน`, func(t *testing.T) {
		bookActivity := entity.BookActivity{
			Date:         time.Now(),
			Time:         "8.00-10.00",
			Comment:      "test",
			Phone_number: "0123456789",
			BookPlanID:   1,
			TouristID:    1,
			ActivityID:   1,
		}

		ok, err := govalidator.ValidateStruct(bookActivity)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณาระบุจำนวนคน"))
	})

	t.Run(`กรุณาเลือกวัน`, func(t *testing.T) {
		bookActivity := entity.BookActivity{
			Time:           "8.00-10.00",
			NumberOfPeople: 5,
			Comment:        "test",
			Phone_number:   "0123456789",
			BookPlanID:     1,
			TouristID:      1,
			ActivityID:     1,
		}

		ok, err := govalidator.ValidateStruct(bookActivity)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("กรุณาเลือกวัน"))
	})

	t.Run(`วันจะต้องเป็นตั้งแต่ปัจจุบัน`, func(t *testing.T) {
		bookActivity := entity.BookActivity{
			Date:           time.Now().AddDate(-1, 0, -1),
			Time:           "8.00-10.00",
			NumberOfPeople: 5,
			Comment:        "test",
			Phone_number:   "0123456789",
			BookPlanID:     1,
			TouristID:      1,
			ActivityID:     1,
		}

		ok, err := govalidator.ValidateStruct(bookActivity)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("วันจะต้องเป็นตั้งแต่ปัจจุบัน"))
	})
}
