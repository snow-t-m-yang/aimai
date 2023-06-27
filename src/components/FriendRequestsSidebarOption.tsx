"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type FriendRequestsSidebarOptionProps = {
  sessionId: string;
  initialUnseenRequestCount: number;
};

const FriendRequestsSidebarOption = ({
  sessionId,
  initialUnseenRequestCount,
}: FriendRequestsSidebarOptionProps) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
    initialUnseenRequestCount,
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`),
    );

    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

    const friendRequestHandler = () => {
      setUnseenRequestCount((prevCount) => prevCount + 1);
    };

    const addedFriendHandler = () => {
      setUnseenRequestCount((prevCount) => prevCount - 1);
    };

    pusherClient.bind("incoming_friend_request", friendRequestHandler);
    pusherClient.bind("new_friend", addedFriendHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`),
      );
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));

      pusherClient.unbind("incoming_friend_request", friendRequestHandler);
      pusherClient.unbind("new_friend", addedFriendHandler);
    };
  }, [sessionId]);

  return (
    <div className="relative">
      <Link
        href="/dashboard/requests"
        className=""
      >
        <div className="">
          <User color="#DB2777" />
        </div>

        {unseenRequestCount > 0 && (
          <div className="absolute w-5 h-5 text-xs text-white bg-pink-600 rounded-full -top-3 left-3">
            {unseenRequestCount}
          </div>
        )}
      </Link>
    </div>
  );
};
export default FriendRequestsSidebarOption;
