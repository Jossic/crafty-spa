import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { reducer as timelinesReducer } from "./timelines/reducer";
import { AuthGateway } from '@/lib/auth/models/auth.gateway';
import { TimelineGateway } from '@/lib/timelines/models/timeline.gateway';
import { FakeAuthGateway } from '@/lib/auth/infra/fake-auth.gateway';
import { FakeTimelineGateway } from '@/lib/timelines/infra/fake-timeline.gateway';

export type Dependencies = {
  authGateway: AuthGateway;
  timelineGateway: TimelineGateway;
};

const rootReducer = timelinesReducer;

export const createStore = (dependencies: Dependencies, preloadedState?: Partial<ReturnType<typeof rootReducer>>) =>
  configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      });
    },
    preloadedState
  });

export const createTestStore = (
  {
    authGateway = new FakeAuthGateway(),
    timelineGateway = new FakeTimelineGateway(),
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<ReturnType<typeof rootReducer>>
) =>
  createStore(
    {
      authGateway,
      timelineGateway,
    },
    preloadedState
  );

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>;
