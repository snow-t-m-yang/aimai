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
    <Link
      href="/dashboard/requests"
      className="flex items-center p-2 text-sm font-semibold leading-6 text-gray-400 rounded-md hover:text-pink-500 hover:bg-grey-50 group gap-x-3"
    >
      <div className="text-gray-400 border-grey-200 group-hover:border-pink-500 group-hover:text-pink-500 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
        <User className="w-4 h-4" />
      </div>
      <p className="truncate">Friend requests</p>

      {unseenRequestCount > 0 && (
        <div className="flex items-center justify-center w-5 h-5 text-xs text-white bg-pink-600 rounded-full">
          {unseenRequestCount}
        </div>
      )}
    </Link>
  );
};
export default FriendRequestsSidebarOption;
