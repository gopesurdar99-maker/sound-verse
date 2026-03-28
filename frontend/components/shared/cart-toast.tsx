"use client";

import { CheckCircle2, Info, XCircle } from "lucide-react";
import { useUiStore } from "@/store/ui-store";

export default function CartToast() {
  const { visible, message, type } = useUiStore();

  if (!visible) return null;

  const icon =
    type === "success" ? (
      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
    ) : type === "error" ? (
      <XCircle className="h-5 w-5 text-red-400" />
    ) : (
      <Info className="h-5 w-5 text-blue-400" />
    );

  return (
    <div className="fixed right-5 top-24 z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/95 px-4 py-3 text-white shadow-2xl backdrop-blur-xl">
        {icon}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
