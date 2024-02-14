package unit_test

import (
	"testing"
	"time"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestCheckInValidation(t *testing.T) {
	BookPlanID := uint(1)

	g := NewGomegaWithT(t)

	t.Run(`checkIn data is required`, func(t *testing.T) {
		check_in := entity.CheckIn{
			CheckIn_date: time.Now(),
			BookPlanID:   &BookPlanID,
		}

		ok, err := govalidator.ValidateStruct(check_in)

		if !ok {
			t.Errorf("Validation failed with error: %v", err)
		}
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}
