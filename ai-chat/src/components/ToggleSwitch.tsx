import React from "react";
import { useRouter } from "next/router";

const AIToggleSwitch = () => {
  const router = useRouter();

  const handleToggle = () => {
    if (router.pathname === "/claude") {
      router.push("/chatGPT");
    } else {
      router.push("/claude");
    }
  };

  return (
    <div className=" overflow-hidden py-[50px] flex justify-center">
      <input
        type="checkbox"
        id="aiToggle"
        className="hidden"
        checked={router.pathname === "/chatGPT"}
        onChange={handleToggle}
      />
      <label
        htmlFor="aiToggle"
        className={`cursor-pointer inline-block relative w-[90px] h-[50px] rounded-[42px] transition-colors duration-200 ${
          router.pathname === "/chatGPT" ? "bg-purple-600" : "bg-purple-300"
        }`}
      >
        <span className="before:content-['Claude'] before:absolute before:-left-[70px] before:top-[15px] before:text-[18px] before:text-white after:content-['ChatGPT'] after:absolute after:-right-[78px] after:top-[15px] after:text-[18px] after:text-[#7F9CF5]"></span>
        <span
          className={`inline-block relative z-10 top-[3px] left-[3px] w-[44px] h-[44px] bg-[#571e98] rounded-full shadow-md transition-all duration-400 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
            router.pathname === "/chatGPT"
              ? "translate-x-[40px] rotate-0 "
              : "-rotate-45"
          }`}
        >
          <span
            className={`absolute top-[18px] left-[10px] w-[4px] h-[4px] bg-[#E8CDA5] rounded-full transition-opacity duration-200 ${
              router.pathname === "/chatGPT" ? "opacity-100" : "opacity-50"
            }`}
          ></span>
          <span
            className={`absolute top-[28px] left-[22px] w-[6px] h-[6px] bg-[#E8CDA5] rounded-full transition-opacity duration-200 ${
              router.pathname === "/chatGPT" ? "opacity-100" : "opacity-50"
            }`}
          ></span>
          <span
            className={`absolute top-[10px] left-[25px] w-[8px] h-[8px] bg-[#E8CDA5] rounded-full transition-opacity duration-200 ${
              router.pathname === "/chatGPT" ? "opacity-100" : "opacity-50"
            }`}
          ></span>
        </span>
        <span
          className={`absolute top-[10px] left-[35px] w-[30px] h-[3px] bg-white rounded-full transition-all duration-300 ${
            router.pathname === "/chatGPT" ? "w-[2px] h-[2px]" : ""
          }`}
        ></span>

        <span
          className={`absolute top-[27px] left-[40px] w-[30px] h-[3px] bg-white rounded-full transition-all duration-300 ${
            router.pathname === "/chatGPT"
              ? "w-[2px] h-[2px] -translate-x-[7px]"
              : ""
          }`}
        ></span>
      </label>
    </div>
  );
};

export default AIToggleSwitch;
