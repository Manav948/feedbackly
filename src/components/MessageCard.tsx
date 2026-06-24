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
        { y: 25, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
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
      whileHover={{ y: -2, scale: 1.005 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative group rounded-2xl overflow-hidden bg-[#111111] border border-[#232323] hover:border-white/20 transition-all duration-300"
    >
      {/* Left solid accent bar (Technical Precision) */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white opacity-40 group-hover:opacity-100 transition-opacity" />

      {/* Top shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.015] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10 p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#232323] border border-[#232323] flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Anonymous</span>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="opacity-0 group-hover:opacity-100 h-7 w-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
              >
                <X className="h-3.5 w-3.5" />
              </motion.button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#111111] border border-[#232323] rounded-2xl shadow-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white text-lg">Delete this message?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                  This action cannot be undone. The message will be permanently deleted from your feedback feed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent border border-[#232323] text-gray-300 hover:bg-white/[0.04] hover:text-white rounded-xl">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  className="bg-red-950/40 border border-red-900/50 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-xl"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Message content */}
        <p className="text-sm leading-relaxed text-[#FAFAFA] mb-4 whitespace-pre-wrap">
          {message.content}
        </p>

        {/* Timestamp */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
          <Clock className="h-3 w-3 text-gray-600" />
          {dayjs(message.createdAt).format("MMM D, YYYY · h:mm A")}
        </div>
      </div>
    </motion.div>
  );
}

// Keep backward compatibility
export { FeedbackCard as MessageCard };
