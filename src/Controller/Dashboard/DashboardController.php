<?php

namespace App\Controller\Dashboard;

use App\Entity\Feedback;
use App\Repository\EventRepository;
use App\Repository\VideoRepository;
use App\Entity\GeneralConfiguration;
use App\Repository\ModuleRepository;
use App\Repository\CategoryRepository;
use App\Repository\PartnersRepository;
use App\Repository\QuestionRepository;
use App\Repository\ProgrammeRepository;
use App\Repository\PageConfigRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\GeneralConfigurationRepository;
use App\Repository\PollRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/dashboard")
 */
class DashboardController extends AbstractController
{
    private $videoRepository;
    private $questionRepository;
    private $generalConfigurationRepository;
    private $categoryRepository;
    private $eventRepository;
    private $partnersRepository;
    private $programmeRepository;
    private $moduleRepository;
    private $pollRepository;

    public function __construct(
        GeneralConfigurationRepository $generalConfigurationRepository,
        VideoRepository $videoRepository,
        QuestionRepository $questionRepository,
        CategoryRepository $categoryRepository,
        PartnersRepository $partnersRepository,
        EventRepository $eventRepository,
        ProgrammeRepository $programmeRepository,
        ModuleRepository $moduleRepository,
        PollRepository $pollRepository
    )
    {
        $this->generalConfigurationRepository = $generalConfigurationRepository;
        $this->videoRepository = $videoRepository;
        $this->questionRepository = $questionRepository;
        $this->categoryRepository = $categoryRepository;
        $this->eventRepository = $eventRepository;
        $this->partnersRepository = $partnersRepository;
        $this->programmeRepository = $programmeRepository;
        $this->moduleRepository = $moduleRepository;
        $this->pollRepository = $pollRepository;
    }

    /**
     * @Route("/", name="dashboard", methods={"GET"})
     */
    public function dashboard()
    {
        $modules = $this->moduleRepository->findBy([], ['id'=>'ASC']);
        $questions = $this->questionRepository->findBy([], ['id'=>'DESC']);
        return $this->render('dashboard/dashboard.html.twig', [
            'controller_name'   => 'Dashboard',
            'questions'         => $questions,
            'polls'             => $this->pollRepository->findAll(),
            'modules'           => $modules
        ]);
    }

    /**
     * @Route("/feedback/{id}", name="feedback_delete", methods={"POST"})
     */
    public function feedback_delete(Request $request, Feedback $feedback, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$feedback->getId(), $request->request->get('_token'))) {
            $entityManager->remove($feedback);
            $entityManager->flush();
        }

        return $this->redirectToRoute('dashboard', [], Response::HTTP_SEE_OTHER);
    }
}
