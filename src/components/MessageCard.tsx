"use client";
import React, { useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import { X } from "lucide-react";
import { Message } from "@/model/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { ApiResponse } from "@/types/apiResponse";
import gsap from "gsap";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // GSAP entry animation
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      if (response.data.success) {
        onMessageDelete(message._id as string);
        toast.success("Message deleted");
      } else {
        toast.error(response.data.message || "Failed to delete");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? "Failed to delete");
    }
  };

  return (
    <Card
      ref={cardRef}
      className="bg-gradient-to-br from-black/60 via-white/10 to-gray-900/80 
                 backdrop-blur-lg border border-white/15 shadow-lg rounded-2xl 
                 transition-transform hover:scale-[1.02] hover:shadow-[0_0_20px_#9333ea]/40"
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          {/* Message Content */}
          <CardTitle className="text-lg font-medium text-gray-100">
            {message.content}
          </CardTitle>

          {/* Delete Button with Alert */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full hover:shadow-[0_0_10px_#ef4444]"
              >
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900 text-gray-100 border border-white/20 backdrop-blur-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-400">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this
                  message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-700 text-gray-200 hover:bg-gray-600">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Timestamp */}
        <div className="text-xs text-gray-400 mt-2">
          {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
        </div>
      </CardHeader>

      <CardContent />
    </Card>
  );
}
