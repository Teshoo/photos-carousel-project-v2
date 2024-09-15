<?php

namespace App\Entity;

use App\Repository\TripDayRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
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

#[ORM\Entity(repositoryClass: TripDayRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Put(),
        new Delete(),
    ],
    formats: 'jsonld'
)]
#[ApiFilter (SearchFilter::class, properties: ['tripStage' => 'exact'])]
class TripDay
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $date = null;

    #[ORM\OneToMany(mappedBy: 'tripDay', targetEntity: Picture::class)]
    private Collection $pictures;

    #[ORM\ManyToOne]
    private ?Hideout $startHideout = null;

    #[ORM\ManyToOne]
    private ?Hideout $endHideout = null;

    #[ORM\ManyToOne(inversedBy: 'tripDays')]
    #[ORM\JoinColumn(nullable: false)]
    private ?TripStage $tripStage = null;

    public function __construct()
    {
        $this->pictures = new ArrayCollection();
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

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(?\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    /**
     * @return Collection<int, Picture>
     */
    public function getPictures(): Collection
    {
        return $this->pictures;
    }

    public function addPicture(Picture $picture): self
    {
        if (!$this->pictures->contains($picture)) {
            $this->pictures->add($picture);
            $picture->setTripDay($this);
        }

        return $this;
    }

    public function removePicture(Picture $picture): self
    {
        if ($this->pictures->removeElement($picture)) {
            // set the owning side to null (unless already changed)
            if ($picture->getTripDay() === $this) {
                $picture->setTripDay(null);
            }
        }

        return $this;
    }

    public function getStartHideout(): ?Hideout
    {
        return $this->startHideout;
    }

    public function setStartHideout(?Hideout $startHideout): self
    {
        $this->startHideout = $startHideout;

        return $this;
    }

    public function getEndHideout(): ?Hideout
    {
        return $this->endHideout;
    }

    public function setEndHideout(?Hideout $endHideout): self
    {
        $this->endHideout = $endHideout;

        return $this;
    }

    public function getTripStage(): ?TripStage
    {
        return $this->tripStage;
    }

    public function setTripStage(?TripStage $tripStage): self
    {
        $this->tripStage = $tripStage;

        return $this;
    }
}
