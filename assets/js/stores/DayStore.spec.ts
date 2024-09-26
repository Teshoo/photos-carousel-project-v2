import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDayStore } from './DayStore';
import { fetchDays, fetchDay, updateDay, createDay, deleteDay } from '../services/day.service';
import { defaultDay, defaultDay1, defaultDays } from '../samples/day.sample';

vi.mock('../services/day.service');

describe('DayStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe('browseDays', () => {
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

    describe('newDay', () => {
        it('calls createDay() and browseDays()', async () => {
            const dayStore = useDayStore(createPinia());
            vi.mocked(createDay).mockResolvedValue({});
            
            await dayStore.newDay(defaultDay);
    
            expect(createDay).toHaveBeenCalled();
            expect(fetchDays).toHaveBeenCalled();
        });
    });

    describe('editDay', () => {
        it('calls updateDay(day) and calls browseDays()'), async () => {
            const dayStore = useDayStore(createPinia());
            await dayStore.editDay(defaultDay);
            expect(updateDay).toHaveBeenCalled();
            expect(fetchDays).toHaveBeenCalled();
        }
    });

    describe('updateCurrentDay', () => {
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

    describe('removeDay()', () => {
        it('calls deleteDay() and browseDays()', async () => {
            const dayStore = useDayStore(createPinia());
            vi.mocked(deleteDay).mockResolvedValue({});
            
            await dayStore.removeDay(defaultDay);
    
            expect(deleteDay).toHaveBeenCalled();
            expect(fetchDays).toHaveBeenCalled();
        });
    });
});