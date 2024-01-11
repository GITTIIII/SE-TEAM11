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
			TimeStart: time.Now(),
			TimeEnd: time.Now(),
			NumberOfPeople: 5,
			Comment: "test",
			Phone_number: "0123456789",
			BookPlanID: 1,
			TouristID:  1,
			ActivityID: 1,
		}

		ok, err := govalidator.ValidateStruct(bookActivity)

		if !ok {
			t.Errorf("Validation failed with error: %v", err)
		}
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run(`phone_number check 10 digit`, func(t *testing.T) {
		bookActivity := entity.BookActivity{
			TimeStart: time.Now(),
			TimeEnd: time.Now(),
			NumberOfPeople: 5,
			Comment: "test",
			Phone_number: "111111111111111111111",
			BookPlanID: 1,
			TouristID:  1,
			ActivityID: 1,
		}

		ok, err := govalidator.ValidateStruct(bookActivity)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal(fmt.Sprintf("PhoneNumber must start with 0 and have length 10 digits")))

	})

	t.Run(`phone_number required`, func(t *testing.T) {
		bookActivity := entity.BookActivity{
			TimeStart: time.Now(),
			TimeEnd: time.Now(),
			NumberOfPeople: 5,
			Comment: "test",
			Phone_number: "",
			BookPlanID: 1,
			TouristID:  1,
			ActivityID: 1,
		}

		ok, err := govalidator.ValidateStruct(bookActivity)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("PhoneNumber is required"))

	})

	t.Run(`NumberOfPeople between 3-10`, func(t *testing.T) {
		bookActivity := entity.BookActivity{
			TimeStart: time.Now(),
			TimeEnd: time.Now(),
			NumberOfPeople: 1,
			Comment: "test",
			Phone_number: "0123456789",
			BookPlanID: 1,
			TouristID:  1,
			ActivityID: 1,
		}

		ok, err := govalidator.ValidateStruct(bookActivity)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("NumberOfPeople must be between 3 and 10"))
	})
}