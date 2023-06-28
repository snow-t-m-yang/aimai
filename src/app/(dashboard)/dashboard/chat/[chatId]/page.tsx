import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Message, messageArrayValidator } from "@/lib/validations/message";
import Image from "next/image";
import Messages from "@/components/Messages";
import ChatInput from "@/components/ChatInput";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type PageProps = {
  params: { chatId: string };
};

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1,
    );

    const dbMessages = results.map((message) => JSON.parse(message) as Message);

    const reverseDbMessages = dbMessages.reverse();

    const messages = messageArrayValidator.parse(reverseDbMessages);

    return messages;
  } catch (error) {
    notFound();
  }
}

const page = async ({ params }: PageProps) => {
  const { chatId } = params;

  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const { user } = session;

  const [userId1, userId2] = chatId.split("--");

  if (user.id !== userId1 && user.id !== userId2) {
    notFound();
  }

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;

  const rawChatPartner = (await fetchRedis(
    "get",
    `user:${chatPartnerId}`,
  )) as string;
  const chatPartner = JSON.parse(rawChatPartner) as User;
  const initialMessages = await getChatMessages(chatId);

  return (
    <div className="flex flex-col bg-transparent justify-between max-h-[100dvh] flex-1">
      <div className="relative flex justify-between w-full py-3 bg-zinc-300/20 sm:items-center">
        <div className="relative flex items-center space-x-4 ">
          <div className="relative w-8 h-8 sm:w-12 sm:h-12">
            <Image
              fill
              referrerPolicy="no-referrer"
              src={chatPartner.image}
              alt={`${chatPartner.name} profile picture`}
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col leading-tight">
            <div className="flex items-center text-xl">
              <span className="mr-3 font-semibold text-gray-300">
                {chatPartner.name}
              </span>
            </div>

            <span className="text-sm text-gray-400">{chatPartner.email}</span>
          </div>
        </div>
      </div>

      <Messages
        initialMessages={initialMessages}
        sessionId={session.user.id}
        sessionImg={session.user.image}
        chatPartner={chatPartner}
        chatId={chatId}
      />

      <ChatInput
        chatId={chatId}
        chatPartner={chatPartner}
      />
    </div>
  );
};
export default page;
