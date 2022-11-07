<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PartnerTypeRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass=PartnerTypeRepository::class)
 * @ApiResource(
 *    attributes={"order"={"id": "ASC"}},
 *    normalizationContext={"groups"={"read:partner"}},
 *    collectionOperations={"get"},
 *    itemOperations={"get"}
 * )
 */
class PartnerType
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
     * @ORM\OneToMany(targetEntity=Partners::class, mappedBy="partnerType")
     */
    private $partner;

    /**
     * @ORM\Column(type="text")
     * @Groups({"read:partner"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:partner"})
     */
    private $slug;

    public function __toString()
    {
        return $this->name;
    }

    public function __construct()
    {
        $this->partner = new ArrayCollection();
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
     * @return Collection<int, Partners>
     */
    public function getPartner(): Collection
    {
        return $this->partner;
    }

    public function addPartner(Partners $partner): self
    {
        if (!$this->partner->contains($partner)) {
            $this->partner[] = $partner;
            $partner->setPartnerType($this);
        }

        return $this;
    }

    public function removePartner(Partners $partner): self
    {
        if ($this->partner->removeElement($partner)) {
            // set the owning side to null (unless already changed)
            if ($partner->getPartnerType() === $this) {
                $partner->setPartnerType(null);
            }
        }

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }
}
