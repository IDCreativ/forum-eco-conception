<?php

namespace App\Entity;

use App\Repository\PartnerTypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PartnerTypeRepository::class)
 */
class PartnerType
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Partners::class, mappedBy="partnerType")
     */
    private $partner;

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
}
