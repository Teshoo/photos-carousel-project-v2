import { describe, expect, it, Mock, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useTripStore } from '../stores/TripStore';
import TripList from './TripList.vue';
import { defaultTrips } from '../samples/trip.sample';
import { Store, StoreDefinition } from 'pinia';
import { UnwrapRef } from 'vue';

function mockedStore<TStoreDef extends () => unknown>(
    useStore: TStoreDef
  ): TStoreDef extends StoreDefinition<
    infer Id,
    infer State,
    infer Getters,
    infer Actions
  >
    ? Store<
        Id,
        State,
        Record<string, never>,
        {
          [K in keyof Actions]: Actions[K] extends (...args: any[]) => any
            ? Mock<Actions[K]>
            : Actions[K]
        }
      > & {
        [K in keyof Getters]: UnwrapRef<Getters[K]>
      }
    : ReturnType<TStoreDef> {
    return useStore() as any
  }

describe('renders TripList', () => {
    it('render the trip list', async () => {
        const wrapper = mount(TripList, {
            global: {
              plugins: [createTestingPinia({
                createSpy: vi.fn
              })],
            }
        });

        const tripStore = mockedStore(useTripStore);
        tripStore.browseTrips.mockResolvedValue();

        tripStore.trips = defaultTrips;

        const todo = wrapper.get('[:class="$style.title"]');
        expect(todo.text()).toBe('VOYAGE');
    })
});