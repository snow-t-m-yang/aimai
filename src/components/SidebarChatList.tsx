"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { chatHrefConstructor } from "@/lib/utils";
import { spawn } from "child_process";

interface SidebarChatListProps {
  friends: User[];
  sessionId: string;
}

const SidebarChatList = ({ friends, sessionId }: SidebarChatListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unSeenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  return (
    <ul
      role="list"
      className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1"
    >
      {friends.sort().map((friend) => {
        const unseenMessagesForEachFriend = unSeenMessages.filter(
          (unseenMsg) => {
            return unseenMsg.senderId === friend.id;
          },
        ).length;

        return (
          <li key={friend.id}>
            <a
              className="flex items-center justify-center p-2 text-sm font-semibold leading-6 rounded-md text-grey-700 hover:text-pink-600 hover:bg-grey-50 group gap-x-3"
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
