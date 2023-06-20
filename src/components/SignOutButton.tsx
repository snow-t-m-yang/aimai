"use client";

import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../components/ui/Button";

const SignOutButton = () => {
  const [isSignOut, setIsSignOut] = useState<boolean>(false);
  return (
    <>
      <Button
        className="dark"
        onClick={async () => {
          setIsSignOut(true);
          try {
            await signOut();
          } catch (error) {
            toast.error("There was a problem signing out");
          }
        }}
      >
        {isSignOut ? (
          <Loader2
            color="#db2778"
            className=" animate-spin"
          />
        ) : (
          <LogOut className="w-4 h-4" />
        )}
      </Button>
    </>
  );
};
export default SignOutButton;
