import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { v4 as uuidv4 } from 'uuid';
import IMessage, { MessageBody } from "../../../types/message";

const initialState: {
  queue: IMessage[];
} = {
  queue: []
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<MessageBody>) {
      console.log('before', state.queue);

      let queue = state.queue.slice(Number(state.queue.length > 2));

      state.queue = queue.concat({id: uuidv4(),...action.payload});
  
    },
    removeMessage(state, action: PayloadAction<string>) {
      let queue = state.queue.slice();
      let messageIndex = queue.findIndex(message => message.id === action.payload);

      if (messageIndex >= 0) {
        queue.splice(messageIndex, 1);

        state.queue = queue;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, { payload }) => ({
      ...payload.messages,
      queue: state.queue
    }));
  }
});

export const { addMessage, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
