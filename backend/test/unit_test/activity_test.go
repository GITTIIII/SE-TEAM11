package unit_test

import (
	"testing"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestActivityValidation(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`activity required`, func(t *testing.T) {
		activity := entity.Activity{
			Activity_name: "",
		}

		ok, err := govalidator.ValidateStruct(activity)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Activity is required"))

	})
}