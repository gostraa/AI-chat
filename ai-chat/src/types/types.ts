export interface Message {
  role: "user" | "assistant";
  content: { type: "text"; text: string };
}

export interface ClaudeState {
  items: Message[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}
