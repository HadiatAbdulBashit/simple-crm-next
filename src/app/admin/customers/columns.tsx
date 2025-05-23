"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Customer } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "company",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Company' />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium
            ${
              status === "Active"
                ? "bg-green-200/20 text-green-800 dark:text-green-200"
                : status === "Prospect"
                ? "bg-yellow-200/20 text-yellow-800 dark:text-yellow-200"
                : "bg-gray-200/20 text-gray-800 dark:text-gray-200"
            }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags: string[] = row.getValue("tags") || [];
      return (
        <div className='flex gap-1 flex-wrap'>
          {tags.map((tag, idx) => (
            <span key={idx} className='bg-blue-100 dark:bg-blue-100/20 text-blue-800 dark:text-blue-300 text-xs px-2 py-0.5 rounded'>
              {tag}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "lastContact",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Last Contact' />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastContact"));
      return <span>{date.toLocaleString()}</span>;
    },
  },
  {
    accessorKey: "assignedTo",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Assigned To' />,
  },
  {
    id: "actions",
    header: () => <div className='text-right'>Action</div>,
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <div className='flex justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(customer.id)}>Copy customer ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/admin/customers/${customer.id}/edit`}>Edit customer</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
