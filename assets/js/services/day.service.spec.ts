import { beforeEach, describe, expect, it, vi } from "vitest";
import { cloneDay, createDay, deleteDay, fetchDay, fetchDays, updateDay } from "./day.service";
import { defaultDaysAPI, defaultDayAPI } from '../samples/dayAPI.sample';
import { defaultDays, defaultDay } from "../samples/day.sample";
import axios from 'axios';

vi.mock('axios');

describe('day.service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('fetchDays', () => {
        it('gets days', async () => {
            vi.mocked(axios.get).mockResolvedValue({
                data: { 'hydra:member': defaultDaysAPI }
            });
            
            const days = await fetchDays(0);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(days).toStrictEqual(defaultDays);
        });

        it('return [] with no entry', async () => {
            vi.mocked(axios.get).mockResolvedValue({
                data: { 'hydra:member': [] }
            });
            
            const days = await fetchDays(0);
    
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(days).toStrictEqual([]);
        });
    });

    describe('fetchDay', () => {
        it('gets day', async () => {
            vi.mocked(axios.get).mockResolvedValue({
                data: defaultDayAPI
            });
            
            const day = await fetchDay(0);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(day).toStrictEqual(defaultDay);
        });
    });

    describe('createDay', () => {
        it('creates day', async () => {
            vi.mocked(axios.post).mockResolvedValue({
                data: defaultDayAPI
            });
            
            const day = await createDay(defaultDay);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(day).toStrictEqual(defaultDay);
        });
    });

    describe('updateDay', () => {
        it('updates day', async () => {
            vi.mocked(axios.put).mockResolvedValue({
                data: defaultDayAPI
            });
            
            const day = await updateDay(defaultDay);

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(day).toStrictEqual(defaultDay);
        });
    });

    describe('deleteDay', () => {
        it('deletes day', async () => {
            vi.mocked(axios.delete).mockResolvedValue({});
            
            await deleteDay(defaultDay);

            expect(axios.delete).toHaveBeenCalledTimes(1);
        });
    });

    describe('cloneDay', () => {
        it('clone day', () => {            
            const clonedday = cloneDay(defaultDay);

            expect(clonedday).toStrictEqual(defaultDay);
        });
    });
});