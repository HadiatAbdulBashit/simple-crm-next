"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import useSWRMutation from "swr/mutation";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomerApi from "@/apis/CustomerApi";
import { customerSchema, CustomerSchema } from "./customer-schema";
import { AppSidebarHeader } from "@/components/app-sidebar-header";
import { BreadcrumbItem } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Customer",
    href: "/admin/customers",
  },
  {
    title: "Create",
    href: "/admin/customers/create",
  },
];

export default function CreateCustomerPage() {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation("/customers", CustomerApi.create);

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

  const onSubmit = async (values: CustomerSchema) => {
    try {
      await trigger(values);
      form.reset();
      router.push("/admin/customers");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AppSidebarHeader breadcrumbs={breadcrumbs} />
      <div className='rounded-xl p-4 w-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 max-w-lg mx-auto'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Customer name' disabled={isMutating} {...field} />
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
                    <Input type='email' placeholder='email@example.com' disabled={isMutating} {...field} />
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
                    <Input placeholder='Phone number' disabled={isMutating} {...field} />
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
                    <Input placeholder='Company name' disabled={isMutating} {...field} />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              name='tags'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder='Comma separated (e.g., VIP, Hot Lead)' disabled={isMutating} {...field} />
                  </FormControl>
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
                    <Input placeholder='Staff name' disabled={isMutating} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={isMutating}>
              {isMutating && <LoaderCircle className='h-4 w-4 animate-spin mr-2' />}
              Create Customer
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
