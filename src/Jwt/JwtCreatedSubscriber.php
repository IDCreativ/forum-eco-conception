<?php

namespace App\Jwt;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{
    public function updateJwtData(JWTCreatedEvent $event)
    {
        // 1. Récupérer l'utilisateur (pour avoir son firstname et lastname)
        $user = $event->getUser();

        // 2. Enrichir les data avec ces données
        $data = $event->getData();
        $data['id'] = $user->getId();
        $data['firstname'] = $user->getFirstname();
        $data['lastname'] = $user->getLastname();
        $data['email'] = $user->getEmail();
        $data['telephone'] = $user->getTelephone();

        $event->setData($data);
    }
}