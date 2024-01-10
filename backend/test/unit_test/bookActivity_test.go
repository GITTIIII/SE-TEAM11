package unit_test

import (
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
	})}