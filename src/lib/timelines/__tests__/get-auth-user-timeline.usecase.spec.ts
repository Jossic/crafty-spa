import { describe, expect, it } from 'vitest';
import { createStore } from '@/lib/create-store';
import { getAuthUserTimeline } from '@/lib/timelines/usecases/get-auth-user-timeline.usecase';
import { FakeTimelineGateway } from '@/lib/timelines/infra/fake-timeline.gateway';
import { FakeAuthGateway } from '@/lib/auth/infra/fake-auth.gateway';
import { selectTimeline } from '@/lib/timelines/slices/timelines.slice';
import { selectMessage } from '@/lib/timelines/slices/messages.slice';


describe('Retrieve auth user timeline', function() {
  it('Ex: Alice is authenticated and can see her timeline', async function() {
    //  Arrange (given)
    givenAuthUserIs('Alice');
    givenExistingTimeline({
      id: 'timeline-id-1',
      user: 'Alice',
      messages: [
        {
          id: 'message-id-1',
          text: 'I love the weather today',
          author: 'Alice',
          publishedAt: '2023-08-1T12:00:00.000Z',
        },
        {
          id: 'message-id-2',
          text: 'Hey guys, did you hear about the party?',
          author: 'Bob',
          publishedAt: '2023-08-1T12:00:00.000Z',
        },
      ],
    });

    //  Act (when)
    await whenRetrieveTimelineForAuthenticatedUser();

    //  Assert (then)
    thenTheReceivedTimelineShouldBe({
      id: 'timeline-id-1',
      user: 'Alice',
      messages: [
        {
          id: 'message-id-1',
          text: 'I love the weather today',
          author: 'Alice',
          publishedAt: '2023-08-1T12:00:00.000Z',
        },
        {
          id: 'message-id-2',
          text: 'Hey guys, did you hear about the party?',
          author: 'Bob',
          publishedAt: '2023-08-1T12:00:00.000Z',
        },
      ],
    });

  });
});


const authGateway = new FakeAuthGateway();
const timelineGateway = new FakeTimelineGateway();
const store = createStore({
  authGateway,
  timelineGateway,
});

const givenAuthUserIs = (user: string) => {
  authGateway.authUser = user;
};
const givenExistingTimeline = (
  timeline: { id: string; user: string; messages: { id: string; publishedAt: string; author: string; text: string }[] }) => {
  timelineGateway.timelineByUser.set('Alice', timeline);
};
const whenRetrieveTimelineForAuthenticatedUser = async () => {
  await store.dispatch(getAuthUserTimeline());
};

const thenTheReceivedTimelineShouldBe = (
  expectedTimeline: {
    id: string;
    messages: { id: string; publishedAt: string; author: string; text: string }[]; user: string
  }) => {
  const authUserTimeline = selectTimeline(expectedTimeline.id, store.getState());
  expect(authUserTimeline).toEqual({
    id: expectedTimeline.id,
    user: expectedTimeline.user,
    messages: expectedTimeline.messages.map((message) => message.id),
  });
  expectedTimeline.messages.forEach((msg) => {
  expect(selectMessage(msg.id, store.getState())).toEqual(msg)
  });
};