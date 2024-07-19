import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendMessage } from "./claudeThunks";
import { ClaudeState, Message } from "@/types/types";

const initialState: ClaudeState = {
  items: [],
  status: "idle",
  error: null,
};

const claudeSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.items = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        sendMessage.fulfilled,
        (state, action: PayloadAction<string>) => {
          const newMessage: Message = {
            role: "assistant",
            content: { type: "text", text: action.payload },
          };
          state.items.push(newMessage);
          state.status = "idle";
        }
      )
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setMessages, addMessage } = claudeSlice.actions;
export default claudeSlice.reducer;
