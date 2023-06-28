import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { fetchRedis } from "@/helpers/redis";
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Aimai - Dashboard",
  description: "Your dashboard",
};

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
    <div className="relative min-h-[100dvh]">
      <main className="">{children}</main>
      <Navbar
        session={session}
        unSeenRequestCount={unSeenRequestCount}
        friends={friends}
      />
    </div>
  );
};

export default layout;
