import { Inter } from "next/font/google";
import { db } from "./lib/db";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  await db.set("hokkaido", "hokkaido");

  return <div className="text-7xl">Hokkaido</div>;
}
