package unit_test

import (
	"testing"

	"github.com/GITTIIII/SE-TEAM11/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestDestinationrequest(t *testing.T) {
		PortOriginID := uint(1)
		PortDestinationID := uint(1)
		DistanceID := uint(1)
		
		g := NewGomegaWithT(t)

		t.Run(`valid destination`, func(t *testing.T) {
			destinationrequest := entity.Destination{
				PortOriginID: &PortOriginID,
				PortDestinationID: &PortDestinationID,
				DistanceID: &DistanceID,
			}
	
			ok, err := govalidator.ValidateStruct(destinationrequest)
	
			g.Expect(ok).To(BeTrue())
			g.Expect(err).To(BeNil())
		})}