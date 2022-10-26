<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PartnersRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity(repositoryClass=PartnersRepository::class)
 * @Vich\Uploadable
 * @ApiResource(
 *    normalizationContext={"groups"={"read:partner"}},
 *    collectionOperations={"get"},
 *    itemOperations={"get"}
 * )
 * 
 */
class Partners
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:partner"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:partner"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:partner"})
     */
    private $logo;

    /**
     * @Vich\UploadableField(mapping="partners_images", fileNameProperty="logo")
     * @var File
     */
    private $logoFile;

    /**
     * @ORM\Column(type="datetime")
     * @var \DateTime
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"read:partner"})
     */
    private $featured;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"read:partner"})
     */
    private $height;

    /**
     * @ORM\ManyToOne(targetEntity=PartnerType::class, inversedBy="partner")
     */
    private $partnerType;

    public function __toString(){
        return (string) $this->name;
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

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(?string $logo): self
    {
        $this->logo = $logo;

        return $this;
    }

    public function setLogoFile(File $logo = null)
    {
        $this->logoFile = $logo;

        // VERY IMPORTANT:
        // It is required that at least one field changes if you are using Doctrine,
        // otherwise the event listeners won't be called and the file is lost
        if ($logo) {
            // if 'updatedAt' is not defined in your entity, use another property
            $this->updatedAt = new \DateTime('now');
        }
    }

    public function getLogoFile()
    {
        return $this->logoFile;
    }

    public function getFeatured(): ?bool
    {
        return $this->featured;
    }

    public function setFeatured(bool $featured): self
    {
        $this->featured = $featured;

        return $this;
    }

    public function getHeight(): ?int
    {
        return $this->height;
    }

    public function setHeight(?int $height): self
    {
        $this->height = $height;

        return $this;
    }

    public function getPartnerType(): ?PartnerType
    {
        return $this->partnerType;
    }

    public function setPartnerType(?PartnerType $partnerType): self
    {
        $this->partnerType = $partnerType;

        return $this;
    }
}
