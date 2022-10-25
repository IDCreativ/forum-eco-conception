<?php

namespace App\Entity;

use App\Repository\ContestEntryRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ContestEntryRepository::class)
 */
class ContestEntry
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="contestEntries")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=ContestOption::class, inversedBy="contestEntries")
     * @ORM\JoinColumn(nullable=false)
     */
    private $contestOption;

    /**
     * @ORM\ManyToOne(targetEntity=ContestQuestion::class, inversedBy="contestEntries")
     * @ORM\JoinColumn(nullable=false)
     */
    private $contestQuestion;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getContestOption(): ?ContestOption
    {
        return $this->contestOption;
    }

    public function setContestOption(?ContestOption $contestOption): self
    {
        $this->contestOption = $contestOption;

        return $this;
    }

    public function getContestQuestion(): ?ContestQuestion
    {
        return $this->contestQuestion;
    }

    public function setContestQuestion(?ContestQuestion $contestQuestion): self
    {
        $this->contestQuestion = $contestQuestion;

        return $this;
    }
}
