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
      {/* Mobile */}
      {/* <div className="md:hidden">
        <MobileChatLayout
          friends={friends}
          session={session}
          sidebarOptions={sidebarOptions}
          unseenRequestCount={unSeenRequestCount}
        />
      </div> */}

      {/* sidebar */}

      {/* <Link
          href="/dashboard"
          className="absolute top-0 left-0"
        >
          <Icons.Logo
            width={50}
            height={50}
          />
        </Link> */}

      <nav className="absolute bottom-0 flex border">
        {friends.length > 0 && (
          <div className="text-xs font-semibold leading-6 text-gray-400"></div>
        )}

        {/* chat session */}
        <div className="flex">
          <ul
            role="list"
            className="flex flex-1 gap-y-7"
          >
            <li>
              <SidebarChatList
                friends={friends}
                sessionId={session.user.id}
              />
            </li>
            <li>
              {sidebarOptions.map((option) => {
                // @ts-ignore
                const Icon = Icons[option.Icon];
                return (
                  <li key={option.id}>
                    <Link
                      href={option.href}
                      className="flex gap-3 p-2 text-sm font-semibold leading-6 text-gray-400 rounded-md hover:text-pink-600 group"
                    >
                      <span className="text-gray-400 border-gray-200 group-hover:border-pink-600 group-hover:text-pink-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                        <Icon className="w-4 h-4" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </li>
            <li>
              <FriendRequestsSidebarOption
                sessionId={session.user.id}
                initialUnseenRequestCount={unSeenRequestCount}
              />
            </li>

            {/* user info */}
            {/* <li className="flex items-center mt-auto -mx-6">
              <div className="flex items-center flex-1 px-6 py-3 text-sm font-semibold leading-6 gap-x-4">
                <div className="relative w-8 h-8 ">
                  <Image
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    fill
                    sizes="8px"
                    src={session.user.image || ""}
                    alt={`${session.user.name || ""} image`}
                  />
                </div>
                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span aria-hidden="true">{session.user.email}</span>
                </div>
              </div>
              <SignOutButton />
            </li> */}
          </ul>
        </div>
      </nav>
      <main className="container w-full max-h-screen py-16 md:py-12">
        {children}
      </main>
    </div>
  );
};

export default layout;
