import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePictureStore } from './PictureStore';
import { fetchPictures, updatePicture } from '../services/picture.service';
import { defaultPicture, defaultPictures } from '../samples/picture.sample';

vi.mock('../services/picture.service');

describe('browsePictures', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('calls fetchPictures()', async () => {
        const pictureStore = usePictureStore(createPinia());
        vi.mocked(fetchPictures).mockResolvedValue(defaultPictures);
        
        await pictureStore.browsePictures();

        expect(fetchPictures).toHaveBeenCalled();
        expect(pictureStore.getPictures.value).toStrictEqual(defaultPictures);
    });
});

describe('editPicture', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('calls updatePicture(picture) and calls browsePictures()'), async () => {
        const pictureStore = usePictureStore(createPinia());
        await pictureStore.editPicture(defaultPicture);
        expect(updatePicture).toHaveBeenCalled();
        expect(fetchPictures).toHaveBeenCalled();
    }
});