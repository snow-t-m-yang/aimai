"use client";

import { Check, UserPlus } from "lucide-react";
import { useState } from "react";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests = ({
  incomingFriendRequests,
  sessionId,
}: FriendRequestsProps) => {
  const [friendRequests, setfriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests,
  );

  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-pink-300">Nothing to show here...</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request.senderId} className="flex items-center gap-4">
            <UserPlus className="" />
            <p className="text-lg font-medium">{request.senderEmail}</p>
            <button
              aria-label="accept friend"
              className="grid w-8 h-8 transition bg-pink-600 rounded-full hover:bg-pink-500 place-items-center hover:shadow-md"
            >
              <Check className="w-3/4 font-semibold text-white h-3/4" />
            </button>
            <button></button>
          </div>
        ))
      )}
    </>
  );
};
export default FriendRequests;
