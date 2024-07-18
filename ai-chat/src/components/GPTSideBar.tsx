import React, { useState } from "react";
import axios from "axios";

const GPTSideBar = () => {
  const [assistants, setAssistants] = useState([]);

  async function fetchAssistants() {
    try {
      const response = await axios.get("https://api.openai.com/v1/assistants", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          "OpenAI-Beta": "assistants=v2",
          "Content-Type": "application/json",
        },
      });

      setAssistants(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  }

  //   useEffect(() => {
  //     fetchAssistants();
  //   }, []);

  return (
    <div className="w-[40%] h-screen overflow-auto px-8 py-16 flex flex-col gap-8 align-center">
      <h1 className="text-center font-bold text-xl">Your Chats</h1>
      <div className="flex flex-col gap-6 ">
        {assistants.length === 0 ? (
          <p className="bg-gray-300 rounded-lg p-4">Loading...</p>
        ) : (
          assistants.map((assistant: any) => (
            <div key={assistant.id} className="bg-gray-300 rounded-lg p-4">
              <p>{assistant.name !== "" ? assistant.name : "new chat"}</p>
            </div>
          ))
        )}
        {assistants.length === 0 ? (
          <p className="bg-gray-300 rounded-lg p-4">Loading...</p>
        ) : (
          assistants.map((assistant: any) => (
            <div key={assistant.id} className="bg-gray-300 rounded-lg p-4">
              <p>{assistant.name !== "" ? assistant.name : "new chat"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GPTSideBar;
