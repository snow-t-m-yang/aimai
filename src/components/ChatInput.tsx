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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const sendMessage = async () => {
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
  return (
    <div className="px-4 pt-4 mb-2 border-t border-gray-200 sm:mb-0">
      <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-pink-600">
        <TextareaAutosize
          className="block w-full text-white resize-none placeholder:text-pink-200 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6 bg-transparent"
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Aimai with ${chatPartner.name} now`}
        />

        <div
          onClick={() => textareaRef.current?.focus()}
          className="py-2"
          aria-hidden="true"
        >
          <div className="py-px">
            <div className="h-9"></div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 flex justify-between py-2 pl-3 pr-2">
          <div className="flex-shrin-0 dark">
            <Button
              isLoading={isLoading}
              onClick={sendMessage}
              type="submit"
            >
              {isLoading ? <Loader2 color="#db2778" /> : "post"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatInput;
