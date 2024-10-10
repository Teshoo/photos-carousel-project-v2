import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchTrips, fetchTrip, createTrip, updateTrip, deleteTrip, cloneTrip } from "./trip.service";
import { defaultTripsAPI, defaultTripAPI } from '../samples/tripAPI.sample';
import { defaultTrips, defaultTrip } from "../samples/trip.sample";
import axios from 'axios';

vi.mock('axios');

describe('trip.service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('fetchTrips', () => {
        it('gets trips', async () => {
            vi.mocked(axios.get).mockResolvedValue({
                data: { 'hydra:member': defaultTripsAPI }
            });
            
            const trips = await fetchTrips();

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(trips).toStrictEqual(defaultTrips);
        });

        it('return [] with no entry', async () => {
            vi.mocked(axios.get).mockResolvedValue({
                data: { 'hydra:member': [] }
            });
            
            const trips = await fetchTrips();
    
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(trips).toStrictEqual([]);
        });
    });

    describe('fetchTrip', () => {
        it('gets trip', async () => {
            vi.mocked(axios.get).mockResolvedValue({
                data: defaultTripAPI
            });
            
            const trip = await fetchTrip(0);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(trip).toStrictEqual(defaultTrip);
        });
    });

    describe('createTrip', () => {
        it('creates trip', async () => {
            vi.mocked(axios.post).mockResolvedValue({
                data: defaultTripAPI
            });
            
            const trip = await createTrip(defaultTrip);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(trip).toStrictEqual(defaultTrip);
        });
    });

    describe('updateTrip', () => {
        it('updates trip', async () => {
            vi.mocked(axios.put).mockResolvedValue({
                data: defaultTripAPI
            });
            
            const trip = await updateTrip(defaultTrip);

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(trip).toStrictEqual(defaultTrip);
        });
    });

    describe('deleteTrip', () => {
        it('deletes trip', async () => {
            vi.mocked(axios.delete).mockResolvedValue({});
            
            await deleteTrip(defaultTrip);

            expect(axios.delete).toHaveBeenCalledTimes(1);
        });
    });

    describe('cloneTrip', () => {
        it('clone trip', () => {            
            const clonedTrip = cloneTrip(defaultTrip);

            expect(clonedTrip).toStrictEqual(defaultTrip);
        });
    });
});