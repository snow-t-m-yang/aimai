"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/Button";

interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}
const ChatInput = ({ chatPartner, chatId }: ChatInputProps) => {
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [wordCount, setWordCount] = useState<number>(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const sendMessage = async () => {
    if (!input) return;
    setIsloading(true);

    try {
      await axios.post("/api/message/send", { text: input, chatId });
      setInput("");
      textareaRef.current?.focus();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsloading(false);
    }
  };

  const handleOnChange = (inputStr: string) => {
    const zhToEn = inputStr.replace(/[^\x00-\xff]/g, " x");

    const words = zhToEn.match(/[\w'-]+|[^\w\s]+/g);

    const wordCount = words ? words.length : 0;
    if (wordCount <= 7) {
      setWordCount(wordCount);
      setInput(inputStr);
    }
  };

  const leftWordCount = 7 - wordCount;
  const isOneWordLeft = leftWordCount === 1;
  const isZeroWordLeft = leftWordCount === 0;

  return (
    <div className="flex items-center px-4 py-3 bg-zinc-300/20 gap-x-3 sm:mb-0">
      <div className="w-full pt-0 mt-0">
        <div className="text-white/50">
          {isZeroWordLeft ? (
            <span className="text-red-500/70">0 word left</span>
          ) : isOneWordLeft ? (
            <span>
              <span>{`${leftWordCount} word left`}</span>
            </span>
          ) : (
            <span>
              <span>{`${leftWordCount} words left`}</span>
            </span>
          )}
        </div>
        <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-pink-600">
          <TextareaAutosize
            className="block w-full border-none text-white resize-none placeholder:text-pink-300/50 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6 bg-transparent"
            ref={textareaRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
                setWordCount(0);
              }
            }}
            value={input}
            onChange={(e) => handleOnChange(e.target.value)}
            placeholder={`aimai with ${chatPartner.name} now`}
          />

          <div
            onClick={() => textareaRef.current?.focus()}
            aria-hidden="true"
          ></div>
        </div>
      </div>

      <Button
        onClick={sendMessage}
        type="submit"
        className={`${
          isZeroWordLeft ? "drop-shadow-[0_0_13px_white]" : ""
        } px-2 rounded-3xl`}
      >
        {isLoading ? (
          <Loader2
            color="#db2778"
            className=" animate-spin"
          />
        ) : (
          "post"
        )}
      </Button>
    </div>
  );
};
export default ChatInput;
