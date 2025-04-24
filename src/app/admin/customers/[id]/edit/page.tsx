"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { customerSchema, CustomerSchema } from "../../create/customer-schema";
import { AppSidebarHeader } from "@/components/app-sidebar-header";
import { BreadcrumbItem } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axiosInstance from "@/apis/axiosInstance";
import { toast } from "sonner";

export default function EditCustomerPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Customer",
      href: "/admin/customers",
    },
    {
      title: "Edit",
      href: `/admin/customers/${params.id}/edit`,
    },
  ];

  const form = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "Active",
      tags: "",
      assignedTo: "",
    },
  });

  useEffect(() => {
    setIsLoading(true);
    const fetchCustomer = async () => {
      const res = await axiosInstance.get(`/customers/${params.id}`);
      form.reset(res.data);
    };
    fetchCustomer();
    setIsLoading(false);
  }, []);

  const onSubmit = async (values: CustomerSchema) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.put(`/customers/${params.id}`, values);
      toast.success(res.data.message || "Customer successfully updated.");
      router.push("/admin/customers");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AppSidebarHeader breadcrumbs={breadcrumbs} />
      <div className='rounded-xl p-4 w-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 max-w-xl mx-auto p-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='company'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='Active'>Active</SelectItem>
                      <SelectItem value='Inactive'>Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='assignedTo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned To</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' onClick={() => onSubmit(form.getValues())} className='w-full' disabled={isLoading}>
              {isLoading && form.formState.isSubmitting && <LoaderCircle className='h-4 w-4 animate-spin mr-2' />}
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
