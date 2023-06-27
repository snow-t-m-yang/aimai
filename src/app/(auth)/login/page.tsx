"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Icons } from "@/components/Icons";

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleLogin() {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex overflow-hidden items-center justify-center min-h-[100dvh] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-8">
            <Icons.Logo
              width={200}
              height={200}
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="Aimai logo"
            />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-pink-600 ">
              Sign in with...
            </h2>
          </div>
          <Button
            className="flex w-full max-w-sm gap-5 mx-auto text-xl font-semibold dark"
            type="button"
            onClick={handleLogin}
          >
            {isLoading ? (
              <Loader2
                color="#db2778"
                className=" animate-spin"
              />
            ) : (
              <Icons.Google
                width={30}
                height={30}
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="Google logo"
              />
            )}
            {isLoading ? null : "Google"}
          </Button>
        </div>
      </div>
    </>
  );
};
export default Page;
