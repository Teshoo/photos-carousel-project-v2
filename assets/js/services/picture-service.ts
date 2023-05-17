export {}

import axios from 'axios';

/**
 * @param {string|null} stageIri
 * @returns {Promise}
 */
export function fetchPictures(dayIri: any) {
    const params: {[index: string]:any}= {};
    if (dayIri) {
        params.tripDay = dayIri;
    }
    return axios.get('/api/pictures', {
        params,
    });
}

/**
 * @param {string|null} pitureIri
 * @param {Object|null} picture
 * @returns {Promise}
 */
export function updatePicture(pictureIri: string, picture: Object) {
    const params: {[index: string]:any}= {};
    if (picture) {
        params.picture = picture;
    }
    return axios.put(pictureIri, params.picture);
}