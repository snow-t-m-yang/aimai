"use client";

import { Button } from "./ui/Button";

const AddFriendButton = () => {
  return (
    <form className="max-w-sm">
      <label htmlFor="email">Add friend by email</label>
      <div>
        <input
          type="text"
          className="block w-full text-black"
          placeholder="Type your email here "
        />
      </div>
      <Button>Add</Button>
    </form>
  );
};
export default AddFriendButton;
