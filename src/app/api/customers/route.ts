import { NextResponse } from "next/server";
import customers from "@/constant/customers.constant.json";

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
