"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarChatListProps {
  friends: User[];
}

const SidebarChatList = ({ friends }: SidebarChatListProps) => {
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

        return <div></div>;
      })}
    </ul>
  );
};
export default SidebarChatList;
