<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Trip;
use App\Entity\TripStage;
use App\Entity\TripDay;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // TRIPS
        $trip = new Trip();
        $trip   ->setName('Slovénie');
        $manager->persist($trip);

        $trip = new Trip();
        $trip   ->setName('Corée du Sud');
        $manager->persist($trip);
        $this   ->addReference('south_korea', $trip);

        // STAGES
        $stage = new TripStage();
        $stage  ->setName('01 - Bukchon')
                ->setTrip($this->getReference('south_korea'));
        $manager->persist($stage);
        $this   ->addReference('bukchon', $stage);

        $stage = new TripStage();
        $stage  ->setName('02 - Hongdae')
                ->setTrip($this->getReference('south_korea'));
        $manager->persist($stage);
        $this   ->addReference('hongdae', $stage);

        $stage = new TripStage();
        $stage  ->setName('03 - Busan')
                ->setTrip($this->getReference('south_korea'));
        $manager->persist($stage);
        $this   ->addReference('busan', $stage);

        $stage = new TripStage();
        $stage  ->setName('04 - Gwanak-gu')
                ->setTrip($this->getReference('south_korea'));
        $manager->persist($stage);
        $this   ->addReference('gwanak_gu', $stage);

        $stage = new TripStage();
        $stage  ->setName('05 - Gangneung')
                ->setTrip($this->getReference('south_korea'));
        $manager->persist($stage);
        $this   ->addReference('gangneung', $stage);

        // DAYS
        $day = new TripDay();
        $day    ->setName('Logement')
                ->setDate(new \DateTime('2019-02-06'))
                ->setTripStage($this->getReference('gangneung'));
        $manager->persist($day);

        $manager->flush();
    }
}
