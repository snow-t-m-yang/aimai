"use client";

import { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ChatInput = () => {
  const [input, setInput] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const sendMessage = () => {};
  return (
    <div className="px-4 mb-2 border-t border-gray-200 sm:mb-0">
      <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-pink-600">
        <TextareaAutosize
          className="text-black"
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
        />
      </div>
    </div>
  );
};
export default ChatInput;
