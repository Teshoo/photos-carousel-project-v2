<?php

namespace App\Entity;

use App\Repository\TripRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TripRepository::class)]
class Trip
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'trip', targetEntity: TripStage::class)]
    private Collection $tripStages;

    #[ORM\OneToMany(mappedBy: 'trip', targetEntity: Extra::class)]
    private Collection $extras;

    public function __construct()
    {
        $this->tripStages = new ArrayCollection();
        $this->extras = new ArrayCollection();
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
     * @return Collection<int, TripStage>
     */
    public function getTripStages(): Collection
    {
        return $this->tripStages;
    }

    public function addTripStage(TripStage $tripStage): self
    {
        if (!$this->tripStages->contains($tripStage)) {
            $this->tripStages->add($tripStage);
            $tripStage->setTrip($this);
        }

        return $this;
    }

    public function removeTripStage(TripStage $tripStage): self
    {
        if ($this->tripStages->removeElement($tripStage)) {
            // set the owning side to null (unless already changed)
            if ($tripStage->getTrip() === $this) {
                $tripStage->setTrip(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Extra>
     */
    public function getExtras(): Collection
    {
        return $this->extras;
    }

    public function addExtra(Extra $extra): self
    {
        if (!$this->extras->contains($extra)) {
            $this->extras->add($extra);
            $extra->setTrip($this);
        }

        return $this;
    }

    public function removeExtra(Extra $extra): self
    {
        if ($this->extras->removeElement($extra)) {
            // set the owning side to null (unless already changed)
            if ($extra->getTrip() === $this) {
                $extra->setTrip(null);
            }
        }

        return $this;
    }
}
