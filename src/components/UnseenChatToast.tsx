import { chatHrefConstructor, cn } from "@/lib/utils";
import { toast, type Toast } from "react-hot-toast";
import Image from "next/image";

interface UnseenChatToastProps {
  t: Toast;
  sessionId: string;
  senderId: string;
  senderImg: string;
  senderName: string;
  senderMessage: string;
}

const UnseenChatToast = ({
  t,
  sessionId,
  senderId,
  senderImg,
  senderName,
  senderMessage,
}: UnseenChatToastProps) => {
  return (
    <div
      className={cn(
        "max-w-md w-full bg-black border border-gray-600 rounded-lg pointer-events-auto flex ring-1 ring-white ring-opacity-5",
        { "animate-in": t.visible, "animate-out": !t.visible },
      )}
    >
      <a
        href={`/dashboard/chat/${chatHrefConstructor(sessionId, senderId)}`}
        onClick={() => toast.dismiss(t.id)}
        className="flex-1 w-0 p-4"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5 ">
            <div className="relative w-10 h-10">
              <Image
                fill
                referrerPolicy="no-referrer"
                className="rounded-full"
                alt={`${senderName} profile picture`}
                src={senderImg}
              />
            </div>
          </div>

          <div className="flex-1 ml-3">
            <p className="text-sm font-medium text-gray-300">{senderName}</p>
            <p className="mt-1 text-sm text-gray-300">{senderMessage}</p>
          </div>
        </div>
      </a>

      <div className="flex border-gray-200 border-1 ">
        <button
          className="flex items-center justify-center w-full p-4 text-sm font-medium text-pink-600 border border-transparent rounded-none rounded-r-lg hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          onClick={() => toast.dismiss(t.id)}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default UnseenChatToast;
