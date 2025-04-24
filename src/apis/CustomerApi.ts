import { CustomerSchema } from "@/app/admin/customers/create/customer-schema";
import axiosInstance from "./axiosInstance";
import { toast } from "sonner";

class CustomerApi {
  static async create(url: string, { arg }: { arg: CustomerSchema }) {
    try {
      const response = axiosInstance.post(url, arg);
      toast.promise(response, {
        loading: "Creating customer...",
        success: "Customer Successfully Created.",
        error: "Customer failed created.",
      });
    } catch (error: any) {
      if (error.response) {
        console.log("Create failed:", error.response.data);
        throw new Error("CustomerApi create: " + error.response.data.error);
      } else {
        console.error("Error tidak diketahui:", error);
        throw new Error("CustomerApi create: " + error.response.data.error);
      }
    }
  }
}

export default CustomerApi;
