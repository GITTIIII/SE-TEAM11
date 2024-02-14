package unit_test

import (
	"testing"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestDestinationValidation(t *testing.T) {
	PortOriginID := uint(1)
	PortDestinationID := uint(1)
	DistanceID := uint(1)

	//correct
	g := NewGomegaWithT(t)
	t.Run(`Destination success`, func(t *testing.T) {
		destination := entity.Destination{
			Destination_name:  "Wales - London",
			Comment:           "มีสิ่งกีดขวาง",
			PortOriginID:      &PortOriginID,
			PortDestinationID: &PortDestinationID,
			DistanceID:        &DistanceID,
		}

		ok, err := govalidator.ValidateStruct(destination)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run(`กรอกต้นทาง - ปลายทาง`, func(t *testing.T) {

		destination := entity.Destination{
			Destination_name:  "",
			Comment:           "มีสิ่งกีดขวาง",
			PortOriginID:      &PortOriginID,
			PortDestinationID: &PortDestinationID,
			DistanceID:        &DistanceID,
		}
		ok, err := govalidator.ValidateStruct(destination)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("กรอกต้นทาง - ปลายทาง"))

	})

	t.Run(`เลือกต้นทาง`, func(t *testing.T) {

		destination := entity.Destination{
			Destination_name:  "Wales - London",
			Comment:           "มีสิ่งกีดขวาง",
			PortDestinationID: &PortDestinationID,
			DistanceID:        &DistanceID,
		}
		ok, err := govalidator.ValidateStruct(destination)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("เลือกต้นทาง"))

	})
	t.Run(`เลือกปลายทาง`, func(t *testing.T) {

		destination := entity.Destination{
			Destination_name: "Wales - London",
			Comment:          "มีสิ่งกีดขวาง",
			PortOriginID:     &PortOriginID,
			DistanceID:       &DistanceID,
		}
		ok, err := govalidator.ValidateStruct(destination)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("เลือกปลายทาง"))

	})
	t.Run(`เลือกระยะทาง`, func(t *testing.T) {

		destination := entity.Destination{
			Destination_name:  "Wales - London",
			Comment:           "มีสิ่งกีดขวาง",
			PortOriginID:      &PortOriginID,
			PortDestinationID: &PortDestinationID,
		}
		ok, err := govalidator.ValidateStruct(destination)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("เลือกระยะทาง"))

	})
	t.Run(`จำนวนตัวอักษรต้องอยู่ระหว่าง 1 ตัว ถึง 100 ตัว`, func(t *testing.T) {
		destination := entity.Destination{
			Destination_name:  "Wales - London",
			Comment:           "asdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklpasdfghjklp",
			PortOriginID:      &PortOriginID,
			PortDestinationID: &PortDestinationID,
			DistanceID:        &DistanceID,
		}

		ok, err := govalidator.ValidateStruct(destination)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("จำนวนตัวอักษรต้องอยู่ระหว่าง 1 ตัว ถึง 100 ตัว"))
	})
}
