"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

  return (
    <Link
      href="/dashboard/requests"
      className="flex items-center p-2 text-sm font-semibold leading-6 text-gray-700 rounded-md hover:text-pink-500 hover:bg-grey-50 group gap-x-3"
    >
      <div className="text-gray-400 border-grey-200 group-hover:border-pink-500 group-hover:text-pink-500 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
        <User h-4 w-4 />
      </div>
      <p className="truncate">Frien``d requests</p>

      {unseenRequestCount > 0 && (
        <div className="flex items-center justify-center w-5 h-5 text-xs text-white bg-pink-600 rounded-full">
          {unseenRequestCount}
        </div>
      )}
    </Link>
  );
};
export default FriendRequestsSidebarOption;
