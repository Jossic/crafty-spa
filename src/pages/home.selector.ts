import { RootState } from '@/lib/create-store';
import { selectTimeline } from '@/lib/timelines/slices/timelines.slice';
import { selectMessage } from '@/lib/timelines/slices/messages.slice';

export const selectHomeSelector = (rootState: RootState) => {

  const timeline = selectTimeline('alice-timeline-1', rootState);

  if (!timeline) return {
    timeline: {
      type: 'TIMELINE_NOT_FOUND',
    },
  };

  if (timeline.messages.length === 0)
    return {
      timeline: {
        messages: {
          type: 'EMPTY_TIMELINE',
          content: 'There is no messages in this timeline',
        },
      },
    };

  const message = selectMessage(timeline.messages[0], rootState);

  return {
    timeline: {
      type: 'TIMELINE_MESSAGES',
      messages: [
        message
      ],
    }
  }
};