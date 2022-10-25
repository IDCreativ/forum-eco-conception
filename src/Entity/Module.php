<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ModuleRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ModuleRepository::class)
 * @ApiResource(
 *      normalizationContext={
 *          "groups"={
 *              "read:config"
 *          }
 *      },
 *      collectionOperations={"get"},
 *      itemOperations={"get"}
 * )
 */
class Module
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:config"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:config"})
     */
    private $name;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"read:config"})
     */
    private $status;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"read:config"})
     */
    private $slug;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"read:config"})
     */
    private $active;

    /**
     * @ORM\ManyToOne(targetEntity=GeneralConfiguration::class, inversedBy="modules")
     */
    private $generalConfiguration;

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

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

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

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): self
    {
        $this->active = $active;

        return $this;
    }

    public function getGeneralConfiguration(): ?GeneralConfiguration
    {
        return $this->generalConfiguration;
    }

    public function setGeneralConfiguration(?GeneralConfiguration $generalConfiguration): self
    {
        $this->generalConfiguration = $generalConfiguration;

        return $this;
    }
}
