import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { handleError, safeAsync, withRetry } from "../lib/errorHandler";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await withRetry(() => axiosInstance.get("/messages/users"));
      set({ users: res.data });
    } catch (error) {
      handleError(error, "Failed to load contacts");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await withRetry(() => axiosInstance.get(`/messages/${userId}`));
      set({ messages: res.data });
    } catch (error) {
      handleError(error, "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      handleError(new Error("No user selected"), "Please select a contact to send a message");
      return;
    }
    
    try {
      const res = await safeAsync(() => 
        axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      // Error already handled by safeAsync
      throw error; // Re-throw to allow UI to handle it
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
