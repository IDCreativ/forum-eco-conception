<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PollVoteRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PollVoteRepository::class)
 * @ApiResource(
 *      attributes={"order"={"id": "DESC"}},
 *      normalizationContext={
 *          "groups"={
 *              "read:pollvote",
 *              "write:pollvote"
 *          }
 *      },
 *      collectionOperations={"GET", "POST"},
 *      itemOperations={"GET"}
 * )
 */
class PollVote
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:pollvote", "write:pollvote"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="pollVotes")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"read:pollvote", "write:pollvote"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Poll::class, inversedBy="pollVotes")
     * @ORM\JoinColumn(nullable=false)
     */
    private $poll;

    /**
     * @ORM\ManyToOne(targetEntity=PollOption::class, inversedBy="pollVotes")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"read:pollvote", "write:pollvote"})
     */
    private $pollOption;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read:pollvote", "write:pollvote"})
     */
    private $freeField;

    public function __toString(){
        return (string) $this->user." - ".$this->pollOption;
    }

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

    public function getPoll(): ?Poll
    {
        return $this->poll;
    }

    public function setPoll(?Poll $poll): self
    {
        $this->poll = $poll;

        return $this;
    }

    public function getPollOption(): ?PollOption
    {
        return $this->pollOption;
    }

    public function setPollOption(?PollOption $pollOption): self
    {
        $this->pollOption = $pollOption;

        return $this;
    }

    public function getFreeField(): ?string
    {
        return $this->freeField;
    }

    public function setFreeField(?string $freeField): self
    {
        $this->freeField = $freeField;

        return $this;
    }
}
