<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\PictureRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;


#[ORM\Entity(repositoryClass: PictureRepository::class)]
#[Vich\Uploadable]
#[ApiResource(
    normalizationContext: ['groups' => ['picture:read']], 
    denormalizationContext: ['groups' => ['picture:write']], 
    operations: [
        new Get(
            formats: 'jsonld'
        ),
        new GetCollection(
            formats: 'jsonld',
            order: ['shotTime' => 'ASC']
        ),
        new Post(
            outputFormats: ['jsonld' => ['application/ld+json']],
            inputFormats: ['multipart' => ['multipart/form-data']]
        ),
        new Put(
            formats: 'jsonld'
        ),
        new Delete(
            formats: 'jsonld'
        ),
    ]
)]
#[ApiFilter (SearchFilter::class, properties: ['tripDay' => 'exact', 'tripDay.tripStage' => 'exact'])]
class Picture
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['picture:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['picture:write', 'picture:read'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['picture:write', 'picture:read'])]
    private ?\DateTimeInterface $shotTime = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['picture:write', 'picture:read'])]
    private ?string $lat = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['picture:write', 'picture:read'])]
    private ?string $lng = null;

    #[Vich\UploadableField(mapping: 'pictures', fileNameProperty: 'imageName', size: 'imageSize')]
    #[Groups(['picture:write'])]
    private ?File $imageFile = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['picture:read'])]
    private ?string $imageName = null;

    #[ORM\Column(nullable: true)]
    private ?int $imageSize = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'pictures')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['picture:write', 'picture:read'])]
    private ?TripDay $tripDay = null;

    #[ORM\ManyToMany(targetEntity: Extra::class, inversedBy: 'pictures')]
    #[Groups(['picture:read'])]
    private Collection $extras;

    public function __construct()
    {
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

    public function getShotTime(): ?\DateTimeInterface
    {
        return $this->shotTime;
    }

    public function setShotTime(\DateTimeInterface $shotTime): self
    {
        $this->shotTime = $shotTime;

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

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    /**
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile|null $imageFile
     */
    public function setImageFile(?File $imageFile = null): void
    {
        $this->imageFile = $imageFile;

        if (null !== $imageFile) {
            $this->updatedAt = new \DateTimeImmutable();
        }
    }

    public function getImageName(): ?string
    {
        return $this->imageName;
    }

    public function setImageName(?string $imageName): void
    {
        $this->imageName = $imageName;
    }

    public function getImageSize(): ?int
    {
        return $this->imageSize;
    }

    public function setImageSize(?int $imageSize): void
    {
        $this->imageSize = $imageSize;
    }

    public function getTripDay(): ?TripDay
    {
        return $this->tripDay;
    }

    public function setTripDay(?TripDay $tripDay): self
    {
        $this->tripDay = $tripDay;

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
        }

        return $this;
    }

    public function removeExtra(Extra $extra): self
    {
        $this->extras->removeElement($extra);

        return $this;
    }
}
