"use client";

import { cn, toPusherKey } from "@/lib/utils";
import { Message } from "@/lib/validations/message";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";

interface MessageProps {
  initialMessages: Message[];
  sessionId: string;
  sessionImg: string | null | undefined;
  chatPartner: User;
  chatId: string;
}

const Messages = ({
  initialMessages,
  sessionId,
  sessionImg,
  chatPartner,
  chatId,
}: MessageProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  const formatTimestamp = (timestamp: number) => {
    return format(timestamp, "HH:mm");
  };

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

    const messageHandler = (message: Message) => {
      setMessages((prevMsg) => [message, ...prevMsg]);
    };

    pusherClient.bind("incoming_message", messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
      pusherClient.unbind("incoming_message", messageHandler);
    };
  }, [chatId]);

  return (
    <div
      className="flex flex-col-reverse flex-1 h-full gap-4 p-3 overflow-y-auto scrolling-touch scrollbar-thumb-pink scrollbar-thumb-rounded scrollbar-teack-pink-lighter scrollbar-w-2"
      id="messages"
    >
      <div ref={scrollDownRef} />
      {messages.map((msg, index) => {
        const isCurrentUser = msg.senderId === sessionId;
        const isNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index].senderId;

        return (
          <div
            id="chat-message"
            key={`${msg.id}--${msg.timestamp}`}
          >
            <div
              className={cn("flex items-end", {
                "justify-end": isCurrentUser,
              })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base max-w-xs mx-2",
                  {
                    "order-1 items-end": isCurrentUser,
                    "order-2 items-start": !isCurrentUser,
                  },
                )}
              >
                <span
                  className={cn("px-4 py-2 rounded-lg inline-block", {
                    "bg-pink-600 text-white": isCurrentUser,
                    "bg-gray-600 text-white": !isCurrentUser,
                    "rounded-br-none":
                      !isNextMessageFromSameUser && isCurrentUser,
                    "rounded-bl-none":
                      !isNextMessageFromSameUser && !isCurrentUser,
                  })}
                >
                  {msg.text}{" "}
                </span>
                <span className="ml-2 text-xs text-gray-300/50">
                  {formatTimestamp(msg.timestamp)}
                </span>
              </div>

              <div
                className={cn("relative w-6 h-6", {
                  "order-2": isCurrentUser,
                  "order-1": !isCurrentUser,
                  invisible: isNextMessageFromSameUser,
                })}
              >
                <Image
                  fill
                  src={
                    isCurrentUser ? (sessionImg as string) : chatPartner.image
                  }
                  alt="Profile picture"
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Messages;
