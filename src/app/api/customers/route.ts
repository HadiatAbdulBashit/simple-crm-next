import { NextResponse } from "next/server";
import customers from "@/constant/customers.constant.json";
import { v4 as uuidv4 } from "uuid";

import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const size = parseInt(searchParams.get("size") || "10", 10);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const sort = searchParams.get("sort"); // Example: "email:asc"

  // 1. Filter by email
  let filtered = customers.filter((user) => user.email.toLowerCase().includes(search));

  // 2. Sort
  if (sort) {
    const [key, dir] = sort.split(":");

    filtered = filtered.sort((a, b) => {
      const aVal = a[key as keyof typeof a];
      const bVal = b[key as keyof typeof b];

      // Sort for dates
      const isDate = ["createdAt", "lastContact"].includes(key);
      const aDate = isDate ? new Date(aVal as string).getTime() : aVal;
      const bDate = isDate ? new Date(bVal as string).getTime() : bVal;

      if (aDate < bDate) return dir === "asc" ? -1 : 1;
      if (aDate > bDate) return dir === "asc" ? 1 : -1;
      return 0;
    });
  }

  // 3. Pagination
  const start = (page - 1) * size;
  const paginated = filtered.slice(start, start + size);

  const totalPages = Math.ceil(filtered.length / size);

  return NextResponse.json({
    data: paginated,
    totalPages,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newCustomer = {
      id: uuidv4(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      status: body.status,
      tags: body.tags || [],
      lastContact: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      assignedTo: body.assignedTo,
    };

    const filePath = path.join(process.cwd(), "src/constant/customers.constant.json");
    fs.writeFileSync(filePath, JSON.stringify([...customers, newCustomer], null, 2));

    return NextResponse.json({ success: true, customer: newCustomer }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create customer" }, { status: 400 });
  }
}
