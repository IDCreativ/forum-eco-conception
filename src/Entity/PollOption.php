<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PollOptionRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PollOptionRepository::class)
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
class PollOption
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:pollvote", "write:pollvote"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"read:pollvote", "write:pollvote"})
     */
    private $type;

    /**
     * @ORM\Column(type="text")
     * @Groups({"read:pollvote", "write:pollvote"})
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity=PollVote::class, mappedBy="pollOption")
     */
    private $pollVotes;

    /**
     * @ORM\ManyToOne(targetEntity=Poll::class, inversedBy="pollOptions")
     * @ORM\JoinColumn(nullable=false)
     */
    private $poll;

    public function __toString(){
        return (string) $this->description;
    }

    public function __construct()
    {
        $this->pollVotes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?int
    {
        return $this->type;
    }

    public function setType(int $type): self
    {
        $this->type = $type;

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

    /**
     * @return Collection|PollVote[]
     */
    public function getPollVotes(): Collection
    {
        return $this->pollVotes;
    }

    public function addPollVote(PollVote $pollVote): self
    {
        if (!$this->pollVotes->contains($pollVote)) {
            $this->pollVotes[] = $pollVote;
            $pollVote->setPollOption($this);
        }

        return $this;
    }

    public function removePollVote(PollVote $pollVote): self
    {
        if ($this->pollVotes->removeElement($pollVote)) {
            // set the owning side to null (unless already changed)
            if ($pollVote->getPollOption() === $this) {
                $pollVote->setPollOption(null);
            }
        }

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

    public function isVotedByUser($user) : bool
    {
        foreach ($this->pollVotes as $pollVote)
        {
            if ($pollVote->getUser() == $user)
            {
                return true;
            }
        }
        return false;
    }
}
