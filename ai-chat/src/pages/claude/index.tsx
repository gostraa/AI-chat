import React, { useState, useEffect } from "react";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import AIToggleSwitch from "@/components/toggleSwitch";

const ClaudePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    { role: string; content: { type: string; text: string } }[]
  >([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const sendMessage = async (message: string) => {
    const newMessage = {
      role: "user",
      content: { type: "text", text: message },
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setIsLoading(true);

    try {
      const res = await fetch("/api/claudeApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      setIsLoading(false);

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const data = await res.json();
      const assistantMessage = {
        role: "assistant",
        content: { type: "text", text: data.message },
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      localStorage.setItem(
        "chatMessages",
        JSON.stringify([...messages, newMessage, assistantMessage])
      );
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-[700px]">
      <div className="flex flex-col h-screen bg-gray-900">
        <AIToggleSwitch />
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">
          Chat with Claude
        </h1>

        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ClaudePage;
