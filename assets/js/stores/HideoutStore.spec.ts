import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useHideoutStore } from './HideoutStore';
import { createHideout, deleteHideout, fetchHideouts, updateHideout } from '../services/hideout.service';
import { defaultHideout, defaultHideouts } from '../samples/hideout.sample';

vi.mock('../services/hideout.service');

describe('HideoutStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    describe('browsehideouts', () => {
        it('calls fetchHideouts()', async () => {
            const hideoutStore = useHideoutStore(createPinia());
            vi.mocked(fetchHideouts).mockResolvedValue(defaultHideouts);
            
            await hideoutStore.browseHideouts();

            expect(fetchHideouts).toHaveBeenCalled();
            expect(hideoutStore.getHideouts.value).toStrictEqual(defaultHideouts);
        });
    });

    describe('newHideout', () => {
        it('calls createHideout() and browseHideouts()', async () => {
            const hideoutStore = useHideoutStore(createPinia());
            vi.mocked(createHideout).mockResolvedValue({});
            
            await hideoutStore.newHideout(defaultHideout);
    
            expect(createHideout).toHaveBeenCalled();
            expect(fetchHideouts).toHaveBeenCalled();
        });
    });

    describe('editHideout', () => {
        beforeEach(() => {
            setActivePinia(createPinia());
        });

        it('calls updateHideout(hideout) and calls browseHideouts()'), async () => {
            const hideoutStore = useHideoutStore(createPinia());
            await hideoutStore.editHideout(defaultHideout);
            expect(updateHideout).toHaveBeenCalled();
            expect(fetchHideouts).toHaveBeenCalled();
        }
    });

    describe('removeHideout()', () => {
        it('calls deleteHideout() and browseHideouts()', async () => {
            const hideoutStore = useHideoutStore(createPinia());
            vi.mocked(deleteHideout).mockResolvedValue();
            
            await hideoutStore.removeHideout(defaultHideout);
    
            expect(deleteHideout).toHaveBeenCalled();
            expect(fetchHideouts).toHaveBeenCalled();
        });
    });
});