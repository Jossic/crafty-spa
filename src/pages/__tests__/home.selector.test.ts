import { createTestStore } from '@/lib/create-store';
import { describe, expect, it } from 'vitest';
import { selectHomeSelector } from '@/pages/home.selector';

describe('view model / selector', function() {
  it('Example: There is no timeline in the store', () => {
    const store = createTestStore();

    const homeSelector = selectHomeSelector(store.getState());

    expect(homeSelector).toEqual({
      timeline: {
        type: 'TIMELINE_NOT_FOUND',
      },
    });
  });

  it('Example: There is no messages in the timeline', () => {
    const store = createTestStore({}, {
      timelines: {
        ids: ['alice-timeline-1'],
        entities: {
          'alice-timeline-1': {
            id: 'alice-timeline-1',
            user: 'Alice',
            messages: [],

          },
        },
      },
    });

    const homeSelector = selectHomeSelector(store.getState());

    expect(homeSelector).toEqual({
      timeline: {
        messages: {
          type: 'EMPTY_TIMELINE',
          content: 'There is no messages in this timeline',
        },
      },
    });
  });

  it('Example: There is one message in the timeline', () => {
    const store = createTestStore({}, {
      timelines: {
        ids: ['alice-timeline-1'],
        entities: {
          'alice-timeline-1': {
            id: 'alice-timeline-1',
            user: 'Alice',
            messages: ['msg-1'],

          },
        },
      },
      messages: {
        ids: ['msg-1'],
        entities: {
          'msg-1': {
            id: 'msg-1',
            author: 'Alice',
            text: 'Hello world!',
            publishedAt: '2021-10-10T10:00:00Z',
          },
        },
      },
    });

    const homeSelector = selectHomeSelector(store.getState());

    expect(homeSelector).toEqual({
      timeline: {
        type: 'TIMELINE_MESSAGES',
        messages: [
          {
            id: 'msg-1',
            author: 'Alice',
            text: 'Hello world!',
            publishedAt: '2021-10-10T10:00:00Z',
          },
        ],

      },
    });
  });
});