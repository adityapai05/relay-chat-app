import { create } from "zustand";
import { axiosInstance } from "../lib/axios.ts";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: Socket | null;
  checkAuth: () => Promise<void>;
  signup: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,
  onlineUsers: [],
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      console.log("Error in checkAuth: ", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data: any) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
      get().connectSocket();
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data: any) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in Successfully!");

      get().connectSocket();
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
      get().disconnectSocket();
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  },
  updateProfile: async (data: any) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.log("Error in updtaeProfile in useAuthStore: ", err);
      toast.error(err.response.data.message);
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
      }
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (userIds) => {
       set({ onlineUsers: userIds });
    })
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
