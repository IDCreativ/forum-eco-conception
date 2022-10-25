<?php

namespace App\DataFixtures;

use DateTime;
use DateInterval;
use Faker\Factory;
use App\Entity\User;
use App\Entity\Event;
use App\Entity\Video;
use App\Entity\Module;
use App\Entity\Chapter;
use App\Entity\Category;
use App\Entity\Partners;
use App\Entity\Programme;
use App\Entity\GeneralConfiguration;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use App\Repository\GeneralConfigurationRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $userPasswordHasher;
    private $generalConfigurationRepository;

    public function __construct(
        UserPasswordHasherInterface $userPasswordHasher,
        GeneralConfigurationRepository $generalConfigurationRepository
    ) {
        $this->userPasswordHasher = $userPasswordHasher;
        $this->generalConfigurationRepository = $generalConfigurationRepository;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        // Création de l'utilisateur administrateur
        $user = new User;

        $hash = $this->userPasswordHasher->hashPassword($user, "Bluecom86");

        $user->setRoles(["ROLE_ADMIN"]);
        $user->setPassword($hash);
        $user->setEmail('dimbo@blue-com.fr');
        $user->setFirstname('David');
        $user->setLastname('Bluecom');
        $user->setTelephone($faker->e164PhoneNumber);

        $manager->persist($user);
        $manager->flush();


        // Créations des partenaires
        for ($p = 1; $p < 9; $p++) {
            $partner = new Partners;
            $partner
                ->setName($faker->company)
                ->setLogo('partner-' . $p . '.svg')
                ->setFeatured(0)
            ;
            $manager->persist($partner);
        }

        // Création de l'événement par défaut
        $date = new DateTime();
        $nextDate = $date->add(new DateInterval('P30D'));

        $defaultEvent = new Event;
        $defaultEvent
            ->setName('Événement par défaut')
            ->setDateStart(new \DateTime('2022-08-05 09:00:00'))
            ->setDateEnd($nextDate)
            ->setActive(true)
            ->setPublic(false);
        $manager->persist($defaultEvent);

        // Création des modules
        $module1 = new Module;
        $module1
            ->setName('Questions/Réponses')
            ->setSlug('questions-reponses')
            ->setStatus(1)
            ->setActive(true);

        $module2 = new Module;
        $module2
            ->setName('Sondages')
            ->setSlug('sondages')
            ->setStatus(1)
            ->setActive(true);
        $modules = array($module1, $module2);

        $manager->persist($module1);
        $manager->persist($module2);

        // Création de la configuration
        $configSite = new GeneralConfiguration;
        $configSite
            ->setTitle('Titre de votre site')
            ->setTagline('Your tagline here')
            ->setEvent($defaultEvent)
            ->setLogo(null)
            ->addModule($modules[0])
            ->addModule($modules[1]);
        $manager->persist($configSite);

        // Création des catégories
        $categories = array();
        for ($c = 0; $c < 2; $c++) {
            $category = new Category;
            if ($c === 0) {
                $category->setName('Live');
            } else if ($c === 1) {
                $category->setName('Vidéo');
            } else {
                $category->setName('Catégorie ' . $c);
            }
            $category
                ->setName($faker->word)
                ->setDescription($faker->sentence);
            $manager->persist($category);
            $categories[] = $category;
        }

        // Création des chapitres
        for ($ch = 0; $ch < 4; $ch++) {
            $chapter = new Chapter;
            switch ($ch) {
                case 0:
                    $chapter->setName('Introduction par');
                    break;
                case 1:
                    $chapter->setName('Chapitre I');
                    break;
                case 2:
                    $chapter->setName('Chapitre II');
                    break;
                case 3:
                    $chapter->setName('Chapitre III');
                    break;
                default:
                    $chapter->setName('Chapitre ' . $ch);
                    break;
            }
            $chapter
                ->setDescription($faker->sentence)
                ->setEvent($defaultEvent);
            $manager->persist($chapter);

            // Création des programmes pour ce chapitre
            switch ($ch) {
                case 0:
                    $programme1 = new Programme;
                    $programme1
                        ->setName('Jim Martinez')
                        ->setDescription('<p><em>Jim Martinez est un acteur et écrivain français. Il est actuellement présenté comme réalisateur et producteur de la série "Jim et la pomme"</em></p>')
                        ->setChapter($chapter)
                        ->setImage('77-6101576e3706a378935166.jpg')
                        ->setEvent($defaultEvent);
                    $manager->persist($programme1);

                    $programme2 = new Programme;
                    $programme2
                        ->setName('Jean-Claude Van Damme')
                        ->setDescription('<p><em>Jean-Claude Van Damme est un acteur français et auteur. Il est actuellement présenté comme réalisateur et producteur de la série "Jim et la pomme"</em></p>')
                        ->setChapter($chapter)
                        ->setEvent($defaultEvent);
                    $manager->persist($programme2);
                    break;
                case 1:
                    $programme1 = new Programme;
                    $programme1
                        ->setName('Clémence Chaumette')
                        ->setDescription('<p><em>Directrice Patrimoniale</em></p>')
                        ->setChapter($chapter)
                        ->setImage('2-610143b6b90be436018102.jpg')
                        ->setDateStart(new \DateTime('2022-08-05 10:45:00'))
                        ->setDateEnd(new \DateTime('2022-08-05 11:00:00'))
                        ->setEvent($defaultEvent);
                    $manager->persist($programme1);

                    $programme2 = new Programme;
                    $programme2
                        ->setName('Teddy Ferrand')
                        ->setDescription('<p><em>Verum ad istam omnem orationem brevis est defensio.</em></p>')
                        ->setChapter($chapter)
                        ->setImage('47127680-10219058346909808-4874611027091652608-n-61016bb75716f420762540.jpg')
                        ->setDateStart(new \DateTime('2022-08-05 11:05:00'))
                        ->setDateEnd(new \DateTime('2022-08-05 12:00:00'))
                        ->setEvent($defaultEvent);
                    $manager->persist($programme2);
                    break;
                case 2:
                    $programme1 = new Programme;
                    $programme1
                        ->setName('Jessica Marade')
                        ->setDescription('<p><em>Verum ad istam omnem orationem brevis est defensio. Nam quoad aetas M. Caeli</em></p>')
                        ->setChapter($chapter)
                        ->setImage('72-6101447e8265d033797625.jpg')
                        ->setDateStart(new \DateTime('2022-08-05 12:05:00'))
                        ->setDateEnd(new \DateTime('2022-08-05 12:45:00'))
                        ->setEvent($defaultEvent);
                    $manager->persist($programme1);

                    $programme2 = new Programme;
                    $programme2
                        ->setName('John Doe')
                        ->setDescription('<p><em>Verum ad istam omnem orationem brevis est defensio.</em></p>')
                        ->setChapter($chapter)
                        ->setDateStart(new \DateTime('2022-08-05 14:00:00'))
                        ->setDateEnd(new \DateTime('2022-08-05 15:00:00'))
                        ->setEvent($defaultEvent);
                    $manager->persist($programme2);
                    break;
                case 3:
                    $programme1 = new Programme;
                    $programme1
                        ->setName('Jean-Claude Van Damme')
                        ->setDescription('<p><em>Jean-Claude Van Damme est un acteur français et auteur. Il est actuellement présenté comme réalisateur et producteur de la série "Jim et la pomme"</em></p>')
                        ->setChapter($chapter)
                        ->setDateStart(new \DateTime('2022-08-05 16:00:00'))
                        ->setDateEnd(new \DateTime('2022-08-05 17:00:00'))
                        ->setEvent($defaultEvent);
                    $manager->persist($programme1);
                    break;
                default:
                    $programme1 = new Programme;
                    $programme1
                        ->setName('Clémence Chaumette')
                        ->setDescription('<p><em>Directrice Patrimoniale</em></p>')
                        ->setChapter($chapter)
                        ->setImage('77-6101576e3706a378935166.jpg')
                        ->setDateStart(new \DateTime('2022-08-05 10:45:00'))
                        ->setDateEnd(new \DateTime('2022-08-05 11:00:00'))
                        ->setEvent($defaultEvent);
                    $manager->persist($programme1);
                    break;
            }
        }

        // Création des vidéos
        $ytVideo1 = '<iframe width="1920" height="1080" src="https://www.youtube.com/embed/lxRuy00_EYc?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        $ytVideo2 = '<iframe width="1920" height="1080" src="https://www.youtube.com/embed/kbNGBWm7FxQ?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        $ytVideo3 = '<iframe width="1920" height="1080" src="https://www.youtube.com/embed/vn5JbZbeQq8?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        $ytVideo4 = '<iframe width="560" height="315" src="https://www.youtube.com/embed/lGTpHubz_zA?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        $ytVideo5 = '<iframe width="1920" height="1080" src="https://www.youtube.com/embed/lGTpHubz_zA?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        $ytVideo6 = '<iframe width="1920" height="1080" src="https://www.youtube.com/embed/lxRuy00_EYc?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

        for ($v = 1; $v <= 6; $v++) {
            $video = new Video;
            $video
                ->setName($faker->sentence)
                ->setPosition($v + 1)
                ->setPlatform(0)
                ->setEmbedCode(${'ytVideo' . $v})
                ->setEvent($defaultEvent)
                ->setStatus(1)
                ->setType(1)
                ->setCategory($categories[0]);
            $manager->persist($video);
        }

        $manager->flush();
    }
}
