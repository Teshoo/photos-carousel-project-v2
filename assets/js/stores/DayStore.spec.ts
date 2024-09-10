import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDayStore } from './DayStore';
import { fetchDays, fetchDay, updateDay } from '../services/day.service';
import { defaultDay, defaultDay1, defaultDays } from '../samples/day.sample';

vi.mock('../services/day.service');

describe('browseDays', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('calls fetchDays()', async () => {
        const dayStore = useDayStore(createPinia());
        vi.mocked(fetchDays).mockResolvedValue(defaultDays);
        
        await dayStore.browseDays();

        expect(fetchDays).toHaveBeenCalled();
        expect(dayStore.getDays.value).toStrictEqual(defaultDays);
    });
});

describe('browseCurrentDay', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.mocked(fetchDay).mockReset();
    });

    it('calls fetchDay(id) with empty currentDay', async () => {
        const dayStore = useDayStore(createPinia());
        vi.mocked(fetchDay).mockResolvedValue(defaultDay);
        
        await dayStore.browseCurrentDay(defaultDay.id);

        expect(fetchDay).toHaveBeenCalled();
        expect(dayStore.getCurrentDay.value).toStrictEqual(defaultDay);
    });

    it('calls fetchDay(id) with new currentDay', async () => {
        const dayStore = useDayStore(createPinia());
        vi.mocked(fetchDay).mockResolvedValue(defaultDay);
        await dayStore.browseCurrentDay(defaultDay.id);
        vi.mocked(fetchDay).mockResolvedValue(defaultDay1);

        await dayStore.browseCurrentDay(defaultDay1.id);

        expect(fetchDay).toHaveBeenCalled();
        expect(dayStore.getCurrentDay.value).toStrictEqual(defaultDay1);
    });

    it('does nothing, currentDay already being currentDay', async () => {
        const dayStore = useDayStore(createPinia());
        vi.mocked(fetchDay).mockResolvedValue(defaultDay);
        await dayStore.browseCurrentDay(defaultDay.id);
        expect(fetchDay).toHaveBeenCalledTimes(1);

        await dayStore.browseCurrentDay(defaultDay.id);

        expect(fetchDay).toHaveBeenCalledTimes(1);
        expect(dayStore.getCurrentDay.value).toStrictEqual(defaultDay);
    });
});

describe('editDay', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('calls updateDay(day) and calls browseDays()'), async () => {
        const dayStore = useDayStore(createPinia());
        await dayStore.editDay(defaultDay);
        expect(updateDay).toHaveBeenCalled();
        expect(fetchDays).toHaveBeenCalled();
    }
});

describe('updateCurrentDay', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('calls updateDay(day) and calls browseDays()', async () => {
        const dayStore = useDayStore(createPinia());
        vi.mocked(fetchDays).mockResolvedValue(defaultDay);
        await dayStore.browseCurrentDay(defaultDay.id);
        vi.mocked(updateDay).mockResolvedValue(defaultDay1);
        
        await dayStore.updateCurrentDay(defaultDay.id);

        expect(updateDay).toHaveBeenCalled();
        expect(dayStore.getCurrentDay.value).toStrictEqual(defaultDay1);
        expect(fetchDays).toHaveBeenCalled();
    });
});