<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Trip;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $trip = new Trip();
        $trip   ->setName('Slovénie');
        $manager->persist($trip);

        $trip = new Trip();
        $trip   ->setName('Corée du Sud');
        $manager->persist($trip);

        $manager->flush();
    }
}
