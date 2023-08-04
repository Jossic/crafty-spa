import { expect, describe, it } from 'vitest';

describe('Retrieve auth user timeline', function() {
  it('Ex: Alice is authenticated and can see her timeline', async function() {
    //  Arrange (given)
    givenAuthUserIs('Alice');
    givenExistingTimeline({
      user: 'Alice',
      messages: [
        { id: 1, text: 'I love the weather today', author: 'Alice', timestamp: 1345436400000 },
        { id: 2, text: 'Hey guys, did you hear about the party?', author: 'Bob', timestamp: 1345436400000 },
      ],
    })

    //  Act (when)
    await whenRetrieveTimelineForAuthenticatedUser();

    //  Assert (then)
    thenTheReceivedTimelineShouldBe({
      messages: [
        { id: 1, text: 'I love the weather today', author: 'Alice', timestamp: 1345436400000 },
        { id: 2, text: 'Hey guys, did you hear about the party?', author: 'Bob', timestamp: 1345436400000 },
      ],
    });

  });
});