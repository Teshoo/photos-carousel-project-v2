<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Vich\UploaderBundle\Templating\Helper\UploaderHelper;
use App\Entity\Trip;
use App\Entity\TripStage;
use App\Entity\TripDay;
use App\Entity\Picture;

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
        $this   ->addReference('gangneung_logement', $day);

        $day = new TripDay();
        $day    ->setName('Day 1 : Arrivée')
                ->setDate(new \DateTime('2019-02-06'))
                ->setTripStage($this->getReference('gangneung'));
        $manager->persist($day);
        $this   ->addReference('gangneung_day_1', $day);

        $day = new TripDay();
        $day    ->setName('Day 2 : Tour du lac')
                ->setDate(new \DateTime('2019-02-07'))
                ->setTripStage($this->getReference('gangneung'));
        $manager->persist($day);
        $this   ->addReference('gangneung_day_2', $day);

        $day = new TripDay();
        $day    ->setName('Day 3 : Parc Olympique')
                ->setDate(new \DateTime('2019-02-08'))
                ->setTripStage($this->getReference('gangneung'));
        $manager->persist($day);
        $this   ->addReference('gangneung_day_3', $day);

        // PICTURES
        $picture = new Picture();
        $picture->setName('Gangmun Sotdae Bridge')
                ->setShotTime(new \DateTimeImmutable('2019-02-06T17:35:11.000Z'))
                ->setLat('37.79689')
                ->setLng('128.91715')
                ->setTripDay($this->getReference('gangneung_day_1'));
        $manager->persist($picture);

        $picture = new Picture();
        $picture->setName('Gangmun Beach')
                ->setShotTime(new \DateTimeImmutable('2019-02-06T17:35:20.000Z'))
                ->setLat('37.79689')
                ->setLng('128.91715')
                ->setTripDay($this->getReference('gangneung_day_1'));
        $manager->persist($picture);

        $manager->flush();
    }
}
