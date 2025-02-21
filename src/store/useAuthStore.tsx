import { create } from "zustand";
import { api } from "../lib/axios";
import { toast } from "react-toastify";

interface AuthState {
  authUser: any | null;
  isSigningUp: boolean;
  isUpdating: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  fullName: string;
  email: string;
  password: string;
}

interface UpdateProfileWithoutPassword {
  newFullName: string | null;
  newEmail: string | null;
  profilePicFile?: File | null;
}

interface UpdatePassword {
  currentPassword: string | null;
  newPassword: string | null;
}

type UpdateProfileData = UpdateProfileWithoutPassword | UpdatePassword;

const createFormData = (data: UpdateProfileWithoutPassword) => {
  const formData = new FormData();
  if (data.newFullName) formData.append("newFullName", data.newFullName);
  if (data.newEmail) formData.append("newEmail", data.newEmail);
  if (data.profilePicFile)
    formData.append("profilePicFile", data.profilePicFile);
  return formData;
};

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isUpdating: false,

  checkAuth: async () => {
    try {
      const response = await api.get("/auth/check");
      console.log("Response data: ", response.data);
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: SignupData) => {
    set({ isSigningUp: true });
    try {
      const response = await api.post("/auth/signup", data);
      toast.success("Account created successfully!");
      set({ authUser: response.data });
    } catch (error: unknown) {
      if (error && (error as ErrorResponse).response) {
        toast.error((error as ErrorResponse).response.data.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: LoginData) => {
    set({ isLoggingIn: true });
    try {
      const response = await api.post("/auth/login", data);
      if (response.data) {
        set({ authUser: response.data });
        toast.success("Login successful!");
      } else {
        set({ authUser: null });
      }
    } catch (error: unknown) {
      set({ authUser: null });
      if (error && (error as ErrorResponse).response) {
        const { message } = (error as ErrorResponse).response.data;
        throw { message };
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error: unknown) {
      if (error && (error as ErrorResponse).response) {
        toast.error((error as ErrorResponse).response.data.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  },

  updateProfile: async (data: UpdateProfileData) => {
    set({ isUpdating: true });
    try {
      const payload =
        "currentPassword" in data
          ? data
          : createFormData(data as UpdateProfileWithoutPassword);

      const response = await api.put("/auth/update", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data) {
        set({ authUser: response.data });
        toast.success("Profile has successfully updated!");
      }
    } catch (error: unknown) {
      if (error && (error as ErrorResponse).response) {
        toast.error((error as ErrorResponse).response.data.message);
      } else {
        toast.error("Error with profile update!");
      }
    } finally {
      set({ isUpdating: false });
    }
  },
}));
