<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\FeedbackRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=FeedbackRepository::class)
 * @ApiResource(
 *      attributes={"order"={"id": "DESC"}},
 *      normalizationContext={
 *          "groups"={
 *              "read:feedback",
 *              "read:event"
 *          }
 *      },
 *      collectionOperations={"GET", "POST"},
 *      itemOperations={"GET", "PUT", "DELETE"}
 * )
 */
class Feedback
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"read:feedback", "read:event"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"read:feedback", "read:event"})
     */
    private $stars;

    /**
     * @ORM\Column(type="text")
     * @Groups({"read:feedback", "read:event"})
     */
    private $message;

    /**
     * @ORM\ManyToOne(targetEntity=Event::class, inversedBy="feedback")
     * @ORM\JoinColumn(nullable=false)
     */
    private $event;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="feedback")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"read:feedback"})
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStars(): ?int
    {
        return $this->stars;
    }

    public function setStars(int $stars): self
    {
        $this->stars = $stars;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getEvent(): ?Event
    {
        return $this->event;
    }

    public function setEvent(?Event $event): self
    {
        $this->event = $event;

        return $this;
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
}
