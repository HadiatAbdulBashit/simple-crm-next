import { NextResponse } from "next/server";
import customers from "@/constant/customers.constant.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const size = parseInt(searchParams.get("size") || "10", 10);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const sort = searchParams.getAll("sort"); // Example: ["email:asc"]

  // 1. Filter
  let filtered = customers.filter((user) => user.email.toLowerCase().includes(search));

  // 2. Sorting
  if (sort.length > 0) {
    sort.forEach((s) => {
      const [key, dir] = s.split(":");
      filtered = filtered.sort((a, b) => {
        const aVal = a[key as keyof typeof a];
        const bVal = b[key as keyof typeof b];
        if (aVal < bVal) return dir === "asc" ? -1 : 1;
        if (aVal > bVal) return dir === "asc" ? 1 : -1;
        return 0;
      });
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
