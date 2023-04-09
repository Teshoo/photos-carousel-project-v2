<?php

namespace App\Entity;

use App\Repository\TripStageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: TripStageRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Put(),
        new Delete(),
    ],
)]
#[ApiFilter (SearchFilter::class, properties: ['trip' => 'exact'])]
class TripStage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(
        min:5, 
        max:20, 
        minMessage:'The name is too short {{ limit }}', 
        maxMessage:'The name is too long (20 characters max)')]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'tripStage', targetEntity: TripDay::class)]
    private Collection $tripDays;

    #[ORM\ManyToOne(inversedBy: 'tripStages')]
    private ?Trip $trip = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\NotBlank]
    #[Assert\Length(
        min:5, 
        max:15, 
        minMessage:'The name is too short {{ limit }}', 
        maxMessage:'The name is too long (20 characters max)')]
    private ?string $lat = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Length(
        min:5, 
        max:15, 
        minMessage:'The name is too short {{ limit }}', 
        maxMessage:'The name is too long (20 characters max)')]
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
