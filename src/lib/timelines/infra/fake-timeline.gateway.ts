import { GetUserTimelineResponse, TimelineGateway } from '@/lib/timelines/models/timeline.gateway';

export class FakeTimelineGateway implements TimelineGateway {
  timelineByUser = new Map<string, {
    id: string;
    user: string;
    messages: {
      id: string;
      text: string;
      author: string;
      publishedAt: string;
    }[]
  }>();
  getAuthUserTimeline({ userId }: { userId: string }): Promise<GetUserTimelineResponse> {
    const timeline = this.timelineByUser.get(userId);
    if (!timeline) return Promise.reject(new Error('User not found'));
    return Promise.resolve({
      timeline: timeline,
    });
  }

}

export const timelineGateway = new FakeTimelineGateway();