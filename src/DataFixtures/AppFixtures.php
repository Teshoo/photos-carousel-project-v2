<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Trip;
use App\Entity\TripStage;

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
        $this   ->addReference('south_korea', $trip);

        $stage = new TripStage();
        $stage  ->setName('01 - Bukchon')
                ->setTrip($this->getReference('south_korea'));
        $manager->persist($stage);

        $stage = new TripStage();
        $stage  ->setName('02 - Hongdae')
                ->setTrip($this->getReference('south_korea'));
        $manager->persist($stage);

        $stage = new TripStage();
        $stage  ->setName('03 - Busan')
                ->setTrip($this->getReference('south_korea'));
        $manager->persist($stage);

        $stage = new TripStage();
        $stage  ->setName('04 - Gwanak-gu')
                ->setTrip($this->getReference('south_korea'));
        $manager->persist($stage);

        $stage = new TripStage();
        $stage  ->setName('05 - Gangneung')
                ->setTrip($this->getReference('south_korea'));
        $manager->persist($stage);

        $manager->flush();
    }
}
