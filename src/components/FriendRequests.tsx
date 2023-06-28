"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import axios from "axios";
import { Check, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests = ({
  incomingFriendRequests,
  sessionId,
}: FriendRequestsProps) => {
  const router = useRouter();
  const [friendRequests, setfriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests,
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`),
    );

    const friendRequestHandler = ({
      senderId,
      senderEmail,
    }: IncomingFriendRequest) => {
      setfriendRequests((prev) => [...prev, { senderId, senderEmail }]);
    };

    pusherClient.bind("incoming_friend_request", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`),
      );
      pusherClient.unbind("incoming_friend_request", friendRequestHandler);
    };
  }, [sessionId]);

  const acceptFriendRequest = async (senderId: string) => {
    await axios.post("/api/friends/accept", { id: senderId });

    // filtering accepted ids out
    setfriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId),
    );

    router.refresh();
  };

  const denyFriendRequest = async (senderId: string) => {
    await axios.post("/api/friends/deny", { id: senderId });

    setfriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId),
    );

    router.refresh();
  };

  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-pink-300">
          You have 0 friend request, maybe check it later
        </p>
      ) : (
        friendRequests.map((request) => (
          <div
            key={request.senderId}
            className="flex items-center gap-4"
          >
            <UserPlus className="" />
            <p className="text-lg font-medium">{request.senderEmail}</p>
            <button
              onClick={() => acceptFriendRequest(request.senderId)}
              aria-label="accept friend"
              className="grid w-8 h-8 transition bg-pink-600 rounded-full hover:bg-pink-500 place-items-center hover:shadow-md"
            >
              <Check className="w-3/4 font-semibold text-white h-3/4" />
            </button>
            <button
              onClick={() => denyFriendRequest(request.senderId)}
              aria-label="deny friend"
              className="grid w-8 h-8 transition bg-gray-200 rounded-full hover:bg-gray-500 place-items-center hover:shadow-md"
            >
              <X className="w-3/4 font-semibold text-black h-3/4" />
            </button>
          </div>
        ))
      )}
    </>
  );
};
export default FriendRequests;
