import { LoginSchema } from "@/app/(auth)/login/login-schema";
import axiosInstance from "./axiosInstance";
import { toast } from "sonner";

class AuthApi {
  static async login(url: string, { arg }: { arg: LoginSchema }) {
    try {
      const response = await axiosInstance.post(url, arg);
      toast.info("Welcome Back...");
    } catch (error: any) {
      if (error.response) {
        console.log("Login failed:", error.response.data);
        toast.error(error.response.data?.message || "Login failed.");
        throw new Error("AuthApi login: " + error.response.data.error);
      } else {
        console.error("Error tidak diketahui:", error);
        throw new Error("AuthApi login: " + error.response.data.error);
      }
    }
  }

  static async logout() {
    try {
      const { data } = await axiosInstance.post("/logout");
      toast.success(data.message);
    } catch (error: any) {
      throw new Error("AuthApi logout: " + error.response.data.error);
    }
  }
}

export default AuthApi;
