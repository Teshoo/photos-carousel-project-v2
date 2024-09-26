<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class App extends AbstractController
{
    #[Route('/', name: 'app')]
    #[Route('/{route}', name:'vue_pages', requirements:['route' => '^(?!.*_wdt|_profiler).+'])]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }
}