import { beforeEach, describe, expect, it, vi } from "vitest";
import { cloneStage, createStage, deleteStage, fetchStage, fetchStages, updateStage } from "./stage.service";
import { defaultStagesAPI, defaultStageAPI } from '../samples/stageAPI.sample';
import { defaultStages, defaultStage } from "../samples/stage.sample";
import axios from 'axios';

vi.mock('axios');

describe('stage.service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('fetchStages', () => {
        it('gets stages', async () => {
            vi.mocked(axios.get).mockResolvedValue({
                data: { 'hydra:member': defaultStagesAPI }
            });
            
            const stages = await fetchStages(0);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(stages).toStrictEqual(defaultStages);
        });

        it('return [] with no entry', async () => {
            vi.mocked(axios.get).mockResolvedValue({
                data: { 'hydra:member': [] }
            });
            
            const stages = await fetchStages(0);
    
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(stages).toStrictEqual([]);
        });
    });

    describe('fetchStage', () => {
        it('gets stage', async () => {
            vi.mocked(axios.get).mockResolvedValue({
                data: defaultStageAPI
            });
            
            const stage = await fetchStage(0);

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(stage).toStrictEqual(defaultStage);
        });
    });

    describe('createStage', () => {
        it('creates stage', async () => {
            vi.mocked(axios.post).mockResolvedValue({
                data: defaultStageAPI
            });
            
            const stage = await createStage(defaultStage);

            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(stage).toStrictEqual(defaultStage);
        });
    });

    describe('updateStage', () => {
        it('updates stage', async () => {
            vi.mocked(axios.put).mockResolvedValue({
                data: defaultStageAPI
            });
            
            const stage = await updateStage(defaultStage);

            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(stage).toStrictEqual(defaultStage);
        });
    });

    describe('deleteStage', () => {
        it('deletes stage', async () => {
            vi.mocked(axios.delete).mockResolvedValue({});
            
            await deleteStage(defaultStage);

            expect(axios.delete).toHaveBeenCalledTimes(1);
        });
    });

    describe('cloneStage', () => {
        it('clone stage', () => {            
            const clonedstage = cloneStage(defaultStage);

            expect(clonedstage).toStrictEqual(defaultStage);
        });
    });
});