<?php

namespace App\Repository;

use App\Entity\ContestEntry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ContestEntry|null find($id, $lockMode = null, $lockVersion = null)
 * @method ContestEntry|null findOneBy(array $criteria, array $orderBy = null)
 * @method ContestEntry[]    findAll()
 * @method ContestEntry[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ContestEntryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ContestEntry::class);
    }

    // /**
    //  * @return ContestEntry[] Returns an array of ContestEntry objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ContestEntry
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
