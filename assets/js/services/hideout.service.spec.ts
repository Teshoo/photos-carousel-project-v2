import { beforeEach, describe, expect, it, vi } from "vitest";
import { cloneHideout, createHideout, deleteHideout, fetchHideouts, updateHideout } from "./hideout.service";
import { defaultHideoutsAPI, defaultHideoutAPI } from '../samples/hideoutAPI.sample';
import { defaultHideouts, defaultHideout } from "../samples/hideout.sample";
import axios from 'axios';

vi.mock('axios');

describe('hideout.service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('fetchHideouts', () => {
        it('gets hideouts', async () => {
            vi.mocked(axios.get).mockResolvedValue({
                data: { 'hydra:member': defaultHideoutsAPI }
            });
            
            const hideouts = await fetchHideouts(0);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(hideouts).toStrictEqual(defaultHideouts);
        });

        it('return [] with no entry', async () => {
            vi.mocked(axios.get).mockResolvedValue({
                data: { 'hydra:member': [] }
            });
            
            const hideouts = await fetchHideouts(0);
    
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(hideouts).toStrictEqual([]);
        });
    });

    describe('createHideout', () => {
        it('creates hideout', async () => {
            vi.mocked(axios.post).mockResolvedValue({
                data: defaultHideoutAPI
            });
            
            const hideout = await createHideout(defaultHideout);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(hideout).toStrictEqual(defaultHideout);
        });
    });

    describe('updateHideout', () => {
        it('updates hideout', async () => {
            vi.mocked(axios.put).mockResolvedValue({
                data: defaultHideoutAPI
            });
            
            const hideout = await updateHideout(defaultHideout);

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(hideout).toStrictEqual(defaultHideout);
        });
    });

    describe('deleteHideout', () => {
        it('deletes hideout', async () => {
            vi.mocked(axios.delete).mockResolvedValue({});
            
            await deleteHideout(defaultHideout);

            expect(axios.delete).toHaveBeenCalledTimes(1);
        });
    });

    describe('cloneHideout', () => {
        it('clone hideout', () => {            
            const clonedhideout = cloneHideout(defaultHideout);

            expect(clonedhideout).toStrictEqual(defaultHideout);
        });
    });
});