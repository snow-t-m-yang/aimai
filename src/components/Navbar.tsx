"use client";

import { useState } from "react";

import { MoreVertical, UserPlus } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import FriendRequestsSidebarOption from "./FriendRequestsSidebarOption";
import SidebarChatList from "./SidebarChatList";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";

interface NavbarProps {
  friends: User[];
  session: Session;
  unSeenRequestCount: number;
}

const Navbar = ({ friends, session, unSeenRequestCount }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const isChatPage = pathname?.includes("/chat");

  return (
    <>
      <MoreVertical
        className="absolute z-10 -right-1 bottom-[2rem]"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && (
        <nav className="absolute bottom-0 flex w-full py-8 bg-zinc-700/10 backdrop-blur-xl">
          <ul
            role="list"
            className="flex items-center justify-center flex-1 w-full gap-x-5"
          >
            <li>
              <SidebarChatList
                friends={friends}
                sessionId={session.user.id}
              />
            </li>
            <li>
              <Link href="/dashboard/add">
                <UserPlus />
              </Link>
            </li>
            <li>
              <FriendRequestsSidebarOption
                sessionId={session.user.id}
                initialUnseenRequestCount={unSeenRequestCount}
              />
            </li>
            <li>
              <SignOutButton />
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default Navbar;
