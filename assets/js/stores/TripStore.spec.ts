import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTripStore } from './TripStore';
import { fetchTrip, fetchTrips, updateTrip } from '../services/trip.service';
import { defaultTrip, defaultTrip1, defaultTrips } from '../samples/trip.sample';

vi.mock('../services/trip.service');

describe('browseTrips', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('calls fetchTrips()', async () => {
        const tripStore = useTripStore(createPinia());
        vi.mocked(fetchTrips).mockResolvedValue(defaultTrips);
        
        await tripStore.browseTrips();

        expect(fetchTrips).toHaveBeenCalled();
        expect(tripStore.getTrips.value).toStrictEqual(defaultTrips);
    });
});

describe('browseCurrentTrip', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.mocked(fetchTrip).mockReset();
    });

    it('calls fetchTrip(id) with currentTrip being undefined', async () => {
        const tripStore = useTripStore(createPinia());
        vi.mocked(fetchTrip).mockResolvedValue(defaultTrip);

        await tripStore.browseCurrentTrip(defaultTrip.id);

        expect(fetchTrip).toHaveBeenCalled();
        expect(tripStore.getCurrentTrip.value).toStrictEqual(defaultTrip);
    });

    it('calls fetchTrip(id) with new currentTrip', async () => {
        const tripStore = useTripStore(createPinia());
        vi.mocked(fetchTrip).mockResolvedValue(defaultTrip);
        
        await tripStore.browseCurrentTrip(defaultTrip.id);
        vi.mocked(fetchTrip).mockResolvedValue(defaultTrip1);

        await tripStore.browseCurrentTrip(defaultTrip1.id);

        expect(fetchTrip).toHaveBeenCalled();
        expect(tripStore.getCurrentTrip.value).toStrictEqual(defaultTrip1);
    });

    it('it does nothing, currentTrip already being currentTrip', async () => {
        const tripStore = useTripStore(createPinia());
        vi.mocked(fetchTrip).mockResolvedValue(defaultTrip);
        await tripStore.browseCurrentTrip(defaultTrip.id);
        expect(fetchTrip).toHaveBeenCalledTimes(1);

        await tripStore.browseCurrentTrip(defaultTrip.id);

        expect(fetchTrip).toHaveBeenCalledTimes(1);
        expect(tripStore.getCurrentTrip.value).toStrictEqual(defaultTrip);
    });
});

describe('updateCurrentTrip', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('calls updateTrip(trip) and browseTrips()', async () => {
        const tripStore = useTripStore(createPinia());
        vi.mocked(fetchTrip).mockResolvedValue(defaultTrip);
        await tripStore.browseCurrentTrip(defaultTrip.id);
        vi.mocked(updateTrip).mockResolvedValue(defaultTrip1);
        
        await tripStore.updateCurrentTrip(defaultTrip.id);

        expect(updateTrip).toHaveBeenCalled();
        expect(tripStore.getCurrentTrip.value).toStrictEqual(defaultTrip1);
        expect(fetchTrips).toHaveBeenCalled();
    });
});