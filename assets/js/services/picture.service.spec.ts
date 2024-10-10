import { beforeEach, describe, expect, it, vi } from "vitest";
import { clonePicture, createPicture, deletePicture, fetchPictures, updatePicture } from "./picture.service";
import { defaultPicturesAPI, defaultPictureAPI } from '../samples/pictureAPI.sample';
import { defaultPictures, defaultPicture } from "../samples/picture.sample";
import axios from 'axios';

vi.mock('axios');

describe('picture.service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('fetchPictures', () => {
        it('gets pictures', async () => {
            vi.mocked(axios.get).mockResolvedValue({
                data: { 'hydra:member': defaultPicturesAPI }
            });
            
            const pictures = await fetchPictures(0);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(pictures).toStrictEqual(defaultPictures);
        });

        it('return [] with no entry', async () => {
            vi.mocked(axios.get).mockResolvedValue({
                data: { 'hydra:member': [] }
            });
            
            const pictures = await fetchPictures(0);
    
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(pictures).toStrictEqual([]);
        });
    });

    describe('createPicture', () => {
        it('creates picture', async () => {
            vi.mocked(axios.post).mockResolvedValue({
                data: defaultPictureAPI
            });
            const imageFile: File = new File([], 'fileName');
            
            const picture = await createPicture(defaultPicture, imageFile);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(picture).toStrictEqual(defaultPicture);
        });
    });

    describe('updatePicture', () => {
        it('updates picture', async () => {
            vi.mocked(axios.put).mockResolvedValue({
                data: defaultPictureAPI
            });
            
            const picture = await updatePicture(defaultPicture);

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(picture).toStrictEqual(defaultPicture);
        });
    });

    describe('deletePicture', () => {
        it('deletes picture', async () => {
            vi.mocked(axios.delete).mockResolvedValue({});
            
            await deletePicture(defaultPicture);

            expect(axios.delete).toHaveBeenCalledTimes(1);
        });
    });

    describe('clonePicture', () => {
        it('clone picture', () => {            
            const clonedpicture = clonePicture(defaultPicture);

            expect(clonedpicture).toStrictEqual(defaultPicture);
        });
    });
});