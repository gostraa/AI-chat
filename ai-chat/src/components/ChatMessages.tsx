import React from "react";
import LoadingIndicator from "./LoadingIndicator";

interface ChatMessagesProps {
  messages: { role: string; content: { type: string; text: string } }[];
  isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  return (
    <div className="flex-grow p-6">
      <div className="flex flex-col space-y-4">
        {messages?.map((message: any, index) => (
          <div
            key={index}
            className={`flex ${
              message?.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                message?.type === "user" ? "bg-purple-500" : "bg-gray-800"
              } rounded-lg p-4 text-white max-w-sm`}
            >
              {message?.content?.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
              <LoadingIndicator />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
