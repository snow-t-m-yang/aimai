import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { chatHrefConstructor } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const friends = await getFriendsByUserId(session.user.id);

  const friendsWithLastMessage = await Promise.all(
    friends.map(async (friend) => {
      const [RawLastMessage] = (await fetchRedis(
        "zrange",
        `chat:${chatHrefConstructor(session.user.id, friend.id)}:messages`,
        -1,
        -1,
      )) as string[];

      const lastMessage = JSON.parse(RawLastMessage) as Message;

      return {
        ...friend,
        lastMessage,
      };
    }),
  );

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-5xl font-bold">Recent Aimaier</h1>
      {friendsWithLastMessage.length === 0 ? (
        <p className="text-sm text-zinc-500">You have 0 Aimaier</p>
      ) : (
        friendsWithLastMessage.map((friend) => (
          <div
            className="relative p-3 border rounded-md bg-zinc-700 border-zinc-500"
            key={friend.id}
          >
            <div className="absolute inset-y-0 flex top-3 right-4 item-center">
              <ChevronRight className="h-7 w-7 text-zinc-200" />
            </div>
            <Link
              href={`/dashboard/chat/${chatHrefConstructor(
                session.user.id,
                friend.id,
              )}`}
              className="relative sm:flex"
            >
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                <div className="relative w-6 h-6">
                  <Image
                    className="rounded-full"
                    fill
                    src={friend.image}
                    alt={`${friend.name} profile picture`}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold">{friend.name}</h4>
                <p className="max-w-md mt-1">
                  <span className="text-zinc-400">
                    {friend.lastMessage.senderId === session.user.id
                      ? "You: "
                      : ""}
                  </span>
                  {friend.lastMessage.text}
                </p>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};
export default page;
