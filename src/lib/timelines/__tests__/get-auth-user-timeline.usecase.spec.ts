import { describe, expect, it } from 'vitest';
import { createStore } from '@/lib/create-store';
import { getAuthUserTimeline } from '@/lib/timelines/usecases/get-auth-user-timeline.usecase';
import { FakeTimelineGateway } from '@/lib/timelines/infra/fake-timeline.gateway';
import { FakeAuthGateway } from '@/lib/auth/infra/fake-auth.gateway';


describe('Retrieve auth user timeline', function() {
  it('Ex: Alice is authenticated and can see her timeline', async function() {
    //  Arrange (given)
    givenAuthUserIs('Alice');
    givenExistingTimeline({
      user: 'Alice',
      messages: [
        { text: 'I love the weather today', author: 'Alice', publishedAt: '2023-08-1T12:00:00.000Z' },
        { text: 'Hey guys, did you hear about the party?', author: 'Bob', publishedAt: '2023-08-1T12:00:00.000Z' },
      ],
    })

    //  Act (when)
    await whenRetrieveTimelineForAuthenticatedUser();

    //  Assert (then)
    thenTheReceivedTimelineShouldBe({
      user: 'Alice',
      messages: [
        { text: 'I love the weather today', author: 'Alice', publishedAt: '2023-08-1T12:00:00.000Z' },
        { text: 'Hey guys, did you hear about the party?', author: 'Bob', publishedAt: '2023-08-1T12:00:00.000Z' },
      ],
    });

  });
});


const authGateway = new FakeAuthGateway();
const timelineGateway = new FakeTimelineGateway();
const store = createStore({
  authGateway,
  timelineGateway,
})

const givenAuthUserIs = (user: string) => {
  authGateway.authUser = user;
};
const givenExistingTimeline = (timeline: { messages: ({ publishedAt: string; author: string;  text: string } | { publishedAt: string; author: string;  text: string })[]; user: string }) => {
    timelineGateway.timelineByUser.set("Alice", timeline);
};
const whenRetrieveTimelineForAuthenticatedUser = async () => {
  await store.dispatch(getAuthUserTimeline());
};

const thenTheReceivedTimelineShouldBe = (expectedTimeline: { messages: ({ publishedAt: string; author: string;  text: string } | { publishedAt: string; author: string;  text: string })[]; user: string }) => {
  const authUserTimeline = store.getState()
  expect(authUserTimeline).toEqual(expectedTimeline);
};