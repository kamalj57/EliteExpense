"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const CreateBudget = ({ refreshData }) => {
  const [emojiIcon, setEmojiIcon] = useState("😄");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { user } = useUser();

  const onCreateBudget = async () => {
    try {
      const result = await db.insert(Budgets)
        .values({
          name: name,
          amount: amount,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          icon: emojiIcon,
        })
        .returning({ insertedId: Budgets.id });

      if (result) {
        console.log('Budget created with result:', result);
        refreshData();
        toast('Budget created!');
        setName('');
        setAmount('');
        setEmojiIcon("😄");
        console.log('State after reset:', { name, amount, emojiIcon });
      } else {
        console.error('Failed to create budget');
      }
    } catch (error) {
      console.error('Error creating budget:', error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed
      cursor-pointer hover:shadow-md"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button variant="outline" className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >{emojiIcon}</Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-4">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input placeholder="eg.home decor" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mt-4">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input type='number' placeholder="eg.₹5000" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <Button
                  disabled={!(name && amount)}
                  onClick={onCreateBudget}
                  className="mt-5 w-full">Create Budget</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
