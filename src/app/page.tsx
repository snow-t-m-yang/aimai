import Link from "next/link";
import { Button } from "../components/ui/Button";

export default async function Home() {
  return (
    <div className="min-h-[100dvh] grid place-items-center">
      <Link href="/login">
        <Button aria-label="login">Login</Button>
      </Link>
    </div>
  );
}
