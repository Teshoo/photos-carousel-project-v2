<?php

namespace App\EventListener;

use Vich\UploaderBundle\Event\Event;
use Imagine\Gd\Imagine;
use Imagine\Image\Box;

class ImageUploadListener
{

    private const MAX_WIDTH = 1000;
    private const MAX_HEIGHT = 1000;

    private $imagine;

    public function __construct()
    {
        $this->imagine = new Imagine();
    }

    public function onVichUploaderPostUpload(Event $event)
    {       
        $imageFile = $event->getObject()->getImageFile()->getPathName();
        
        list($iwidth, $iheight) = getimagesize($imageFile);
        $ratio = $iwidth / $iheight;
        $width = self::MAX_WIDTH;
        $height = self::MAX_HEIGHT;
        if ($width / $height > $ratio) {
            $width = $height * $ratio;
        } else {
            $height = $width / $ratio;
        }
        
        $image = $this->imagine->open($imageFile);
        
        $image->resize(new Box($width, $height))->save($imageFile);
    }

}