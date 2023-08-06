import { RootState } from '@/lib/create-store';
import { selectTimeline } from '@/lib/timelines/slices/timelines.slice';

export const selectHomeSelector = (rootState: RootState) => {

  const timeline = selectTimeline( "alice-timeline-1", rootState);

  if (!timeline) return { timeline: null };

  return { timeline: {
    messages: []
    } }
};