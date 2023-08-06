import { createTestStore } from '@/lib/create-store';
import { describe, expect, it } from 'vitest';
import { selectHomeSelector } from '@/pages/home.selector';

describe('view model / selector', function() {
  it("Example: There is no timeline in the store", () => {
    const store = createTestStore();

    const homeSelector = selectHomeSelector(store.getState());

    expect(homeSelector).toEqual({
      timeline: null
    })
  })

  it("Example: There is no messages in the timeline", () => {
    const store = createTestStore({}, {
      timelines: {
        ids: ["alice-timeline-1"],
        entities: {
          "alice-timeline-1": {
            id: "alice-timeline-1",
            user: "Alice",
            messages: ["msg"]

          }
        }
      }
    });

    const homeSelector = selectHomeSelector(store.getState());

    expect(homeSelector).toEqual({
      timeline: {
        messages: []
      }
    })
  })
});