<?php

namespace App\Controller\Dashboard;

use App\Entity\PartnerType;
use App\Form\PartnerTypeType;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\PartnerTypeRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/dashboard/partner-type')]
class PartnerTypeController extends AbstractController
{
    #[Route('/', name: 'app_partner_type_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $partnerTypes = $entityManager
            ->getRepository(PartnerType::class)
            ->findAll();

        return $this->render('dashboard/partner_type/index.html.twig', [
            'partner_types' => $partnerTypes,
        ]);
    }

    #[Route('/new', name: 'app_partner_type_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $partnerType = new PartnerType();
        $form = $this->createForm(PartnerTypeType::class, $partnerType);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($partnerType);
            $entityManager->flush();

            return $this->redirectToRoute('app_partner_type_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('dashboard/partner_type/new.html.twig', [
            'partner_type' => $partnerType,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_partner_type_show', methods: ['GET'])]
    public function show(PartnerType $partnerType): Response
    {
        return $this->render('dashboard/partner_type/show.html.twig', [
            'partner_type' => $partnerType,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_partner_type_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, PartnerType $partnerType, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(PartnerTypeType::class, $partnerType);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_partner_type_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('dashboard/partner_type/edit.html.twig', [
            'partner_type' => $partnerType,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_partner_type_delete', methods: ['POST'])]
    public function delete(Request $request, PartnerType $partnerType, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$partnerType->getId(), $request->request->get('_token'))) {
            $entityManager->remove($partnerType);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_partner_type_index', [], Response::HTTP_SEE_OTHER);
    }
}
