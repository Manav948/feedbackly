"use client";
import React, { useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import { X, Clock, MessageSquare } from "lucide-react";
import { Message } from "@/model/User";
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
import { toast } from "react-hot-toast";
import { ApiResponse } from "@/types/apiResponse";
import gsap from "gsap";
import { motion } from "framer-motion";

type FeedbackCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export function FeedbackCard({ message, onMessageDelete }: FeedbackCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
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
    <motion.div
      ref={cardRef}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative group rounded-2xl overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-white/[0.1] hover:border-violet-500/30 hover:shadow-[0_0_25px_rgba(124,58,237,0.12)] transition-all duration-300"
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-blue-500 to-cyan-500" />

      {/* Top shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600/30 to-blue-600/30 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-3.5 w-3.5 text-violet-400" />
            </div>
            <span className="text-xs font-medium text-violet-300/70 uppercase tracking-wider">Anonymous</span>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="opacity-0 group-hover:opacity-100 h-7 w-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
              >
                <X className="h-3.5 w-3.5" />
              </motion.button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#111827]/95 border border-white/10 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white text-lg">Delete this message?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                  This action cannot be undone. The message will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-white/[0.06] border-white/10 text-gray-300 hover:bg-white/[0.1] rounded-xl">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  className="bg-gradient-to-r from-red-600 to-rose-500 text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] rounded-xl border-0"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Message content */}
        <p className="text-sm leading-relaxed text-gray-200 mb-4">
          {message.content}
        </p>

        {/* Timestamp */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="h-3 w-3 text-gray-600" />
          {dayjs(message.createdAt).format("MMM D, YYYY · h:mm A")}
        </div>
      </div>
    </motion.div>
  );
}

// Keep backward compatibility
export { FeedbackCard as MessageCard };
