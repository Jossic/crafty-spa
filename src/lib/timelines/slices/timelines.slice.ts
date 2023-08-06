import { createSlice } from '@reduxjs/toolkit';
import { getAuthUserTimeline } from '@/lib/timelines/usecases/get-auth-user-timeline.usecase';
import { timelinesAdapter } from '@/lib/timelines/models/timeline.entity';
import { RootState } from '@/lib/create-store';

export const timelinesSlice = createSlice({
  name: 'timelines',
  initialState: timelinesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthUserTimeline.fulfilled, (state, action) => {
      timelinesAdapter.addOne(state, {
        id: action.payload.id,
        user: action.payload.user,
        messages: action.payload.messages.map((message) => message.id),
      })
    });
  },
});

export const selectTimeline = (timelineId: string, state: RootState) => timelinesAdapter.getSelectors().selectById(state.timelines, timelineId);