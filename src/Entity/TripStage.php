<?php

namespace App\Entity;

use App\Repository\TripStageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TripStageRepository::class)]
class TripStage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'tripStage', targetEntity: TripDay::class)]
    private Collection $tripDays;

    #[ORM\ManyToOne(inversedBy: 'tripStages')]
    private ?Trip $trip = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $lat = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $lng = null;

    public function __construct()
    {
        $this->tripDays = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, TripDay>
     */
    public function getTripDays(): Collection
    {
        return $this->tripDays;
    }

    public function addTripDay(TripDay $tripDay): self
    {
        if (!$this->tripDays->contains($tripDay)) {
            $this->tripDays->add($tripDay);
            $tripDay->setTripStage($this);
        }

        return $this;
    }

    public function removeTripDay(TripDay $tripDay): self
    {
        if ($this->tripDays->removeElement($tripDay)) {
            // set the owning side to null (unless already changed)
            if ($tripDay->getTripStage() === $this) {
                $tripDay->setTripStage(null);
            }
        }

        return $this;
    }

    public function getTrip(): ?Trip
    {
        return $this->trip;
    }

    public function setTrip(?Trip $trip): self
    {
        $this->trip = $trip;

        return $this;
    }

    public function getLat(): ?string
    {
        return $this->lat;
    }

    public function setLat(?string $lat): self
    {
        $this->lat = $lat;

        return $this;
    }

    public function getLng(): ?string
    {
        return $this->lng;
    }

    public function setLng(?string $lng): self
    {
        $this->lng = $lng;

        return $this;
    }
}
