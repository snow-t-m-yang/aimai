"use client";

import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

const page = () => {
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
      <div className="flex items-center justify-center min-h-full">
        <div>
          logo
          <h2>Sign in</h2>
        </div>
        <Button isLoading={isLoading} type="button" onClick={handleLogin}>
          {isLoading ? null : "goolge"}
          Sign in
        </Button>
      </div>
    </>
  );
};
export default page;
