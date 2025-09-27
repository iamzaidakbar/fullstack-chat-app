import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { handleError, safeAsync, withRetry } from "../lib/errorHandler";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await withRetry(() => axiosInstance.get("/auth/check"));
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      handleError(error, "Failed to verify authentication");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await safeAsync(() =>
        axiosInstance.post("/auth/signup", data)
      );
      set({ authUser: res.data });
      toast.success("Account created successfully! Welcome to ZA Chat!");
      get().connectSocket();
    } catch {
      // Error already handled by safeAsync
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await safeAsync(() =>
        axiosInstance.post("/auth/login", data)
      );
      set({ authUser: res.data });
      toast.success("Welcome back to ZA Chat!");

      get().connectSocket();
    } catch {
      // Error already handled by safeAsync
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await safeAsync(() => axiosInstance.post("/auth/logout"));
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch {
      // Even if logout fails on server, clear local state
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await safeAsync(() =>
        axiosInstance.put("/auth/update-profile", data)
      );
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch {
      // Error already handled by safeAsync
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
