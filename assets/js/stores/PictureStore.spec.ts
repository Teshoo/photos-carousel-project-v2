import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePictureStore } from './PictureStore';
import { createPicture, fetchPictures, updatePicture, deletePicture } from '../services/picture.service';
import { defaultPicture, defaultPictures, newPicture } from '../samples/picture.sample';

vi.mock('../services/picture.service');

describe('PictureStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

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

    describe('newPicture', () => {
        it('calls createPicture() and browsePictures()', async () => {
            const pictureStore = usePictureStore(createPinia());
            vi.mocked(createPicture).mockResolvedValue({});
            
            await pictureStore.newPicture(newPicture, {} as File);
    
            expect(createPicture).toHaveBeenCalled();
            expect(fetchPictures).toHaveBeenCalled();
        });
    });

    describe('replacePicture', () => {
        it('calls createPicture(), removePicture() and browsePictures()', async () => {
            const pictureStore = usePictureStore(createPinia());
            vi.mocked(createPicture).mockResolvedValue({});
            vi.mocked(deletePicture).mockResolvedValue();
            
            await pictureStore.replacePicture(defaultPicture, {} as File);
    
            expect(createPicture).toHaveBeenCalled();
            expect(fetchPictures).toHaveBeenCalled();
            expect(deletePicture).toHaveBeenCalled();
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
});