import { Icon, Icons } from "@/components/Icons";
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

interface LayoutProps {
  children: React.ReactNode;
}

interface SidebarOptions {
  [x: string]: any;
  id: number;
  name: string;
  href: string;
  Icon: string;
}

export const metadata = {
  title: "Aimai - Dashboard",
  description: "Your dashboard",
};

const sidebarOptions: SidebarOptions[] = [
  {
    id: 1,
    name: "Add friend",
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
    <div className="flex w-full h-screen">
      {/* sidebar */}
      <div className="flex-col w-full h-full max-w-xs px-6 overflow-y-auto border-r border-gray-200 md:flex grow gap-y-5">
        <Link
          href="/dashboard"
          className="flex items-center h-16 shrink-0"
        >
          <Icons.Logo className="w-auto h-8 text-pink-600" />
        </Link>

        {friends.length > 0 && (
          <div className="text-xs font-semibold leading-6 text-gray-400">
            Your chats
          </div>
        )}

        {/* chat session */}
        <nav className="flex flex-col flex-1">
          <ul
            role="list"
            className="flex flex-col flex-1 gap-y-7"
          >
            <li>
              <SidebarChatList
                friends={friends}
                sessionId={session.user.id}
              />
            </li>
            <li>
              <div className="text-gray-400">Overview</div>
              <ul
                role="list"
                className="mt-2 -mx-2 space-y-1"
              >
                {sidebarOptions.map((option) => {
                  // @ts-ignore
                  const Icon = Icons[option.Icon];
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="flex gap-3 p-2 text-sm font-semibold leading-6 text-gray-400 rounded-md hover:text-pink-600 group"
                      >
                        <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span>{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <FriendRequestsSidebarOption
                    sessionId={session.user.id}
                    initialUnseenRequestCount={unSeenRequestCount}
                  />
                </li>
              </ul>
            </li>

            {/* user info */}
            <li className="flex items-center mt-auto -mx-6">
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
            </li>
          </ul>
        </nav>
      </div>
      <div className="col-span-2">{children}</div>
    </div>
  );
};

export default layout;
