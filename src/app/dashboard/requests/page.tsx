import AddFriendButton from "@/components/AddFriendButton";
import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  // ids of users who have sent a friend request to the current user

  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user${session.user.id}:incoming_friend_requests`,
  )) as string[];

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as User;
      return {
        senderId,
        senderEmail: sender.email,
      };
    }),
  );
  return (
    <main className="pt-8">
      <h1 className="mb-8 text-5xl font-bold">Add a friend</h1>
      <div className="flex flex-col gap-4">
        <FriendRequests
          incomingFriendRequests={incomingFriendRequests}
          sessionId={session.user.id}
        />
      </div>
    </main>
  );
};
export default page;
