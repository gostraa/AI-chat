import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="flex flex-col h-screen bg-gray-900 align-center">
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl ">
          Welcome to the AI Chat-Bot
        </h1>
        <p className="bg-gradient-to-l from-green-500 to-purple-500 text-transparent bg-clip-text text-center py-20 font-medium text-3xl ">
          select an assistant
        </p>
        <div className="flex gap-20 justify-center">
          <Link
            href={"chatGPT"}
            className="bg-gradient-to-l from-gray-100 to-gray-400 p-6 w-[180px] shadow-lg rounded-md font-bold text-xl text-center hover:bg-gradient-to-b"
          >
            ChatGPT
          </Link>
          <Link
            href={"claude"}
            className="bg-gradient-to-l from-gray-100 to-gray-400 p-6 w-[180px] shadow-lg rounded-md font-bold text-xl text-center hover:bg-gradient-to-b"
          >
            Claude
          </Link>
        </div>
        <div className="flex-grow p-6">
          <div className="flex flex-col space-y-4"></div>
        </div>
      </div>
    </div>
  );
}
