import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (message: string, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/claudeApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      return data.message;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
