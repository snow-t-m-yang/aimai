import { Icons } from "@/components/Icons";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import FriendRequestsSidebarOption from "@/components/FriendRequestsSidebarOption";
import { fetchRedis } from "@/helpers/redis";
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import SidebarChatList from "@/components/SidebarChatList";
import MobileChatLayout from "@/components/MobileChatLayout";
import { SidebarOptions } from "@/types/ui";
import { ArrowLeft, User, UserPlus } from "lucide-react";
import { headers } from "next/headers";
import { is } from "date-fns/locale";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Aimai - Dashboard",
  description: "Your dashboard",
};

const sidebarOptions: SidebarOptions[] = [
  {
    id: 1,
    href: "/dashboard/add",
    Icon: "UserPlus",
  },
];

const layout = async ({ children }: LayoutProps) => {
  const headersList = headers();
  const prevUrl = headersList.get("referer") || "";

  console.log(prevUrl.length);
  const isNotChatPage =
    prevUrl.includes("chat") || prevUrl.length === 0 ? true : false;
  console.log(isNotChatPage);

  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const friends = await getFriendsByUserId(session.user.id);

  const unSeenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`,
    )) as User[]
  ).length;

  return (
    <div className="flex relative w-full min-h-[100dvh]">
      <main className="w-full">{children}</main>
      {isNotChatPage ? (
        <nav className="absolute bottom-0 flex w-full">
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
      ) : null}
    </div>
  );
};

export default layout;
