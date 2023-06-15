import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import FriendRequestsSidebarOption from "@/components/FriendRequestsSidebarOption";
import { fetchRedis } from "@/helpers/redis";

type LayoutProps = {
  children: React.ReactNode;
};

type SidebarOptions = {
  id: number;
  name: string;
  href: string;
  icon: string;
};

const sidebarOptions: SidebarOptions[] = [
  {
    id: 1,
    name: "Add friend",
    href: "/dashboard/add",
    icon: "✨",
  },
];

const layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const unSeenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user${session.user.id}:incoming_friend_requests`,
    )) as User[]
  ).length;

  return (
    <div className="grid grid-cols-3">
      {/* sidebar */}
      <div>
        <Link href="/dashboard">📜</Link>
        <div>Your chat</div>

        {/* chat session */}
        <nav className="flex flex-col flex-1">
          <ul role="list">
            <li>chats</li>
            <li>
              <div>Overview</div>
              <ul role="list">
                {sidebarOptions.map((option) => (
                  <li key={option.id}>
                    <Link href={option.href}>
                      <span>{option.icon}</span>
                      <span>{option.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <FriendRequestsSidebarOption
                sessionId={session.user.id}
                initialUnseenRequestCount={unSeenRequestCount}
              />
            </li>

            {/* user info */}
            <li className="">
              <div>
                <div className="relative">
                  <Image
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    fill
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
