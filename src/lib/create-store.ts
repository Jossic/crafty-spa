import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { timelinesSlice } from '@/lib/timelines/slices/timelines.slice';
import { AuthGateway } from '@/lib/auth/models/auth.gateway';
import { TimelineGateway } from '@/lib/timelines/models/timeline.gateway';

export type Dependencies = {
  authGateway: AuthGateway;
  timelineGateway: TimelineGateway;
}

const rootReducer = timelinesSlice.reducer;
export const createStore = (dependencies: Dependencies) => configureStore({
  reducer: timelinesSlice.reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: dependencies,
  }
  }),
})

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>