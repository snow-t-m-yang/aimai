"use client";

import { addFriendSchema } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { z } from "zod";
import { Button } from "./ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const AddFriendButton = () => {
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);

  type FormData = z.infer<typeof addFriendSchema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendSchema),
  });

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendSchema.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });

      setShowSuccessState(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }

      if (error instanceof AxiosError) {
        setError("email", { message: error.response?.data });
        return;
      }

      setError("email", { message: "Something went wrong." });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <label htmlFor="email">Add friend by email</label>
      <div>
        <input
          {...register("email")}
          type="text"
          className="block w-full text-black"
          placeholder="Type your email here "
        />
      </div>
      <Button>Add</Button>
      <p>{errors.email?.message}</p>
      {showSuccessState ? <p>Friend request sent!</p> : null}
    </form>
  );
};
export default AddFriendButton;
