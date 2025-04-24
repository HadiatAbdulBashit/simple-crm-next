"use client";

import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DataTablePagination } from "@/components/pagination";
import axiosInstance from "@/apis/axiosInstance";
import { Loader2, Loader2Icon } from "lucide-react";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  endpoint: string;
}

export function DataTableServer<TData, TValue>({ columns, endpoint }: DataTableProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageCount, setPageCount] = useState(0);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([{ id: "lastContact", desc: true }]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    company: false,
    phone: false,
    tags: false,
  });
  const [filterValue, setFilterValue] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    const params = {
      page: pagination.pageIndex + 1,
      size: pagination.pageSize,
      sort: "",
      search: filterValue,
    };
    if (sorting.length > 0) {
      const sort = `${sorting[0].id}:${sorting[0].desc ? "desc" : "asc"}`;
      params.sort = sort;
    }

    try {
      const res = await axiosInstance.get(endpoint, { params });
      setData(res.data.data);
      setPageCount(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination, sorting, filterValue]);

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
  }, [sorting, filterValue]);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    manualSorting: true,
    pageCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className='flex items-center pb-4 space-x-2 justify-between'>
        <Input
          placeholder='Search by email...'
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className='max-w-xs !text-sm'
        />
        <div className='flex gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='ml-auto'>
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href='/admin/customers/create' className={buttonVariants({ variant: "default" })}>
            Create
          </Link>
        </div>
      </div>

      <div className='rounded-md border mb-4'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='relative'>
            {data.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='text-center h-24'>
                  No results.
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow className='absolute !bg-white/50 dark:!bg-white/5 top-0 left-0 w-full h-full z-1'>
                <TableCell colSpan={columns.length} className='text-center h-full flex items-center justify-center'>
                  <Loader2Icon className='animate-spin size-12' />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
