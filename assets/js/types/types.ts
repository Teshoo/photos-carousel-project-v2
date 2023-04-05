export type { Trip }

import axios from 'axios';

interface Trip {
    '@context': string,
    '@id': string,
    '@type': string,
    id: number,
    name: string,
    tripStages: Array<string>,
    extras: Array<string>,
}