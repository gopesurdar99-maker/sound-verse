import { create } from "zustand";

type ToastType = "success" | "error" | "info";

type ToastState = {
  message: string;
  type: ToastType;
  visible: boolean;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
};

let toastTimer: ReturnType<typeof setTimeout> | null = null;

export const useUiStore = create<ToastState>((set) => ({
  message: "",
  type: "success",
  visible: false,

  showToast: (message, type = "success") => {
    if (toastTimer) clearTimeout(toastTimer);

    set({
      message,
      type,
      visible: true,
    });

    toastTimer = setTimeout(() => {
      set({ visible: false });
    }, 2200);
  },

  hideToast: () => {
    if (toastTimer) clearTimeout(toastTimer);
    set({ visible: false });
  },
}));
