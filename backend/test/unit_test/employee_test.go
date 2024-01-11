package unit_test

import (
	"testing"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestEmailEmployeeValidation(t *testing.T) {
	EmployeeRoleID := uint(1)

	g := NewGomegaWithT(t)

	t.Run(`email is required`, func(t *testing.T) {

		employee := entity.Employee{
			Name:     "Rattanun",
			Tel:      "0812345678",
			Email:    "", // X
			Picture:  "pic.png",
			Password: "123Ssd",
			Gender:   "Male",

			EmployeeRoleID: &EmployeeRoleID,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Email is required"))
	})

	t.Run(`email is invalid`, func(t *testing.T) {

		employee := entity.Employee{
			Name:     "Rattanun",
			Tel:      "0812345678",
			Email:    "exampleemail.com", // X
			Picture:  "pic.png",
			Password: "123Ssd",
			Gender:   "Male",

			EmployeeRoleID: &EmployeeRoleID,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Email is invalid"))
	})
}

func TestEmployeeValid(t *testing.T) {
	EmployeeRoleID := uint(1)

	g := NewGomegaWithT(t)

	t.Run(`valid employee`, func(t *testing.T) {

		employee := entity.Employee{
			Name:     "Rattanun",
			Tel:      "0812345678",
			Email:    "example@email.com",
			Picture:  "pic.png",
			Password: "123Ssd",
			Gender:   "Male",

			EmployeeRoleID: &EmployeeRoleID,
		}

		ok, err := govalidator.ValidateStruct(employee)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}
