"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { chatHrefConstructor, toPusherKey } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";
import { toast } from "react-hot-toast";
import UnseenChatToast from "./UnseenChatToast";

interface SidebarChatListProps {
  friends: User[];
  sessionId: string;
}

interface ExtendedMessage extends Message {
  senderImg: string;
  senderName: string;
}

const SidebarChatList = ({ friends, sessionId }: SidebarChatListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unSeenMessages, setUnseenMessages] = useState<Message[]>([]);
  const [activeChats, setActiveChats] = useState<User[]>(friends);

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

    const newFriendHandler = (newFriend: User) => {
      setActiveChats((prev) => [...prev, newFriend]);
    };

    const chatHandler = (message: ExtendedMessage) => {
      const shouldNotify =
        pathname !==
        `/dashboard/chat/${chatHrefConstructor(sessionId, message.senderId)}`;

      if (!shouldNotify) return;

      // should be notify
      toast.custom((t) => (
        // custom component
        <UnseenChatToast
          t={t}
          sessionId={sessionId}
          senderId={message.id}
          senderImg={message.senderImg}
          senderName={message.senderName}
          senderMessage={message.text}
        />
      ));

      setUnseenMessages((prev) => [...prev, message]);
    };

    pusherClient.bind("new_message", chatHandler);
    pusherClient.bind("new_friend", newFriendHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));
    };
  }, [pathname, sessionId, router]);

  return (
    <ul
      role="list"
      className="max-h-[25rem]  overflow-y-auto -mx-2 space-y-1"
    >
      {activeChats.sort().map((friend) => {
        const unseenMessagesForEachFriend = unSeenMessages.filter(
          (unseenMsg) => {
            return unseenMsg.senderId === friend.id;
          },
        ).length;

        return (
          <li key={friend.id}>
            <a
              className="flex items-center p-2 text-xl font-semibold leading-6 rounded-md hover:text-pink-600 hover:bg-grey-50 group gap-x-3"
              href={`/dashboard/chat/${chatHrefConstructor(
                sessionId,
                friend.id,
              )}`}
            >
              {friend.name}
              {unseenMessagesForEachFriend > 0 && (
                <div className="flex items-center justify-center w-4 h-4 text-xs font-medium text-white bg-pink-600 rounded-full">
                  {unseenMessagesForEachFriend}
                </div>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
export default SidebarChatList;
