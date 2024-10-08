export {}

import axios from 'axios';
import { map, of } from 'rxjs';
import type { Picture, PictureAPI } from '../types/types';

///////////////////
// DATA FETCHING //
///////////////////

/**
 * @param {number} dayId
 * @returns {Promise}
 */
function fetchPicturesAPI(dayId: number): Promise<any> {
    const params: {[index: string]:any}= {};
    if (dayId) {
        params.tripDay = '/api/trip_days/' + dayId;
    }
    return axios.get('/api/pictures', {
        params,
    });
}

/**
 * @param {Picture} pictureToCreate
 * @param {File} imageFile
 * @returns {Promise}
 */
function createPictureAPI(pictureToCreate: Picture, imageFile: File): Promise<any> {
    const params: {[index: string]:any}= {};
    params.name = pictureToCreate.name;
    params.shotTime = pictureToCreate.shotTime;
    params.lat = pictureToCreate.lat;
    params.lng = pictureToCreate.lng;
    params.tripDay = pictureToCreate.tripDay;
    params.imageFile = imageFile;
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post('/api/pictures', params, config );
}

/**
 * @param {Picture} picture
 * @returns {Promise}
 */
function updatePictureAPI(picture: Picture): Promise<any> {
    const params: {[index: string]:any}= {};
    if (picture) {
        params.picture = picture;
    }
    const config = {
        headers: {
            'content-type': 'application/ld+json'
        }
    }
    return axios.put('/api/pictures/' + picture.id, params.picture, config);
}

/**
 * @param {number} pictureId
 * @returns {Promise}
 */
function deletePictureAPI(pictureId: number): Promise<any> {
    return axios.delete('/api/pictures/' + pictureId);
}

///////////////////////
// DATA MANIPULATION //
///////////////////////

/**
 * @param {number} dayId
 * @returns {Promise}
 */
export async function fetchPictures(dayId: number): Promise<any> {
    try {
        const response = await fetchPicturesAPI(dayId);
        const pictures: Picture[] = picturesAPIToPictures(response.data['hydra:member']);
        return pictures;
    } catch (error) {
        console.log('Could not retrieve pictures: ' + error);
    }
}

/**
 * @param {Picture} pictureToUpdate
 * @returns {Promise}
 */
export async function updatePicture(pictureToUpdate: Picture): Promise<any> {
    try {
        const response = await updatePictureAPI(pictureToUpdate);
        const picture: Picture = pictureAPIToPicture(response.data);
        return picture;
    } catch (error) {
        console.log('Could not update picture: '+ error);
    }
}

/**
 * @param {Picture} pictureToCreate
 * @param {File} imageFile
 * @returns {Promise}
 */
export async function createPicture(pictureToCreate: Picture, imageFile: File): Promise<any> {
    try {
        const response = await createPictureAPI(pictureToCreate, imageFile);
        const picture: Picture = pictureAPIToPicture(response.data);
        return picture;
    } catch (error) {
        console.log('Could not create picture: '+ error);
    }
}

/**
 * @param {Picture} pictureToDelete
 * @returns {Promise}
 */
export async function deletePicture(pictureToDelete: Picture) {
    try {
        await deletePictureAPI(pictureToDelete.id);
    } catch (error) {
        console.log('Could not delete picture: '+ error);
    }
}

/**
 * @param {PictureAPI} pictureAPI
 * @returns {Picture}
 */
export function pictureAPIToPicture(pictureAPI: PictureAPI): Picture {
    return {
        id: pictureAPI.id,
        name: pictureAPI.name,
        shotTime: pictureAPI.shotTime.slice(0,19),
        lat: pictureAPI.lat,
        lng: pictureAPI.lng,
        imageName: pictureAPI.imageName,
        tripDay: pictureAPI.tripDay,
        extras: pictureAPI.extras
    };
}

/**
 * @param {PictureAPI[]} picturesAPI
 * @returns {Picture[]}
 */
export function picturesAPIToPictures(picturesAPI: PictureAPI[]): Picture[] {
    let pictures: Picture[] = [];
    const pictures$ = of(picturesAPI).pipe(
        map(picturesAPI => picturesAPI
            .map(pictureAPI => pictureAPIToPicture(pictureAPI))
        )
    );
    pictures$.subscribe(pictures$ => pictures = pictures$);
    return pictures;
}

/**
 * @param {Picture} picture
 * @param {PictureAPI} picturesAPI
 * @returns {PictureAPI}
 */
export function pictureToPictureAPI(picture: Picture, picturesAPI: PictureAPI): PictureAPI {
    return {
        ...picturesAPI,
        name: picture.name,
        shotTime: picture.shotTime,
        lat: picture.lat,
        lng: picture.lng,
        extras: picture.extras
    };
}

/**
 * @param {Picture} picture
 * @returns {Picture}
 */
export function clonePicture(picture: Picture): Picture {
    return {
        id: picture.id,
        name: picture.name,
        shotTime: picture.shotTime,
        lat: picture.lat,
        lng: picture.lng,
        imageName: picture.imageName,
        tripDay: picture.tripDay,
        extras: picture.extras
    };
}