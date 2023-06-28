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
import Navbar from "@/components/Navbar";

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
      <Navbar
        session={session}
        unSeenRequestCount={unSeenRequestCount}
        friends={friends}
      />
    </div>
  );
};

export default layout;
