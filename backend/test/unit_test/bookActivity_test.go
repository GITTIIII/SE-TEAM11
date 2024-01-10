package unit_test

import (
	"testing"
	"time"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestBookActivity(t *testing.T) {
	BookPlanID := uint(1)
	TouristID := uint(1)
	ActivityID := uint(1)
	
	g := NewGomegaWithT(t)

	t.Run(`valid bookActivity`, func(t *testing.T) {
		bookActivity := entity.BookActivity{
			TimeStart: time.Now(),
			TimeEnd: time.Now(),
			NumberOfPeople: 5,
			Comment: "test",
			Phone_number: "0123456789",
			BookPlanID: &BookPlanID,
			TouristID: &TouristID,
			ActivityID: &ActivityID,
		}

		ok, err := govalidator.ValidateStruct(bookActivity)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})}