import React, { useState } from "react";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import AIToggleSwitch from "@/components/ToggleSwitch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { sendMessage } from "@/store/claudeThunks";
import { Message } from "@/types/types";
import { addMessage } from "@/store/claudeSlice";

const ClaudePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector((state: RootState) => state.messages.items);
  const status = useSelector((state: RootState) => state.messages.status);

  const handleSendMessage = async (message: string) => {
    const newMessage: Message = {
      role: "user",
      content: { type: "text", text: message },
    };
    dispatch(addMessage(newMessage));
    dispatch(sendMessage(message));
    setIsLoading(true);

    if (status === "loading") {
      setIsLoading(true);
    }
  };

  React.useEffect(() => {
    if (status === "idle") {
      setIsLoading(false);
    }
  }, [status]);

  return (
    <div className="container mx-auto max-w-[700px]">
      <div className="flex flex-col h-screen bg-gray-900">
        <AIToggleSwitch />
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-4xl">
          Chat with Claude
        </h1>
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ClaudePage;
