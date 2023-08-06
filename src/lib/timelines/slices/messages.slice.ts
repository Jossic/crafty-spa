import { createSlice } from '@reduxjs/toolkit';
import { getAuthUserTimeline } from '@/lib/timelines/usecases/get-auth-user-timeline.usecase';
import { RootState } from '@/lib/create-store';
import { messagesAdapter } from '@/lib/timelines/models/message.entity';


export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthUserTimeline.fulfilled, (state, action) => {
      messagesAdapter.addMany(state, action.payload.messages)
    });
  },
});

export const selectMessage = (messageId: string, state: RootState) =>
  messagesAdapter.getSelectors().selectById(state.messages, messageId);