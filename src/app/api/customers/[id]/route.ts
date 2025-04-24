import { NextRequest, NextResponse } from "next/server";
import customers from "@/constant/customers.constant.json";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/constant/customers.constant.json");

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const customer = customers.find((cust) => cust.id === id);

  if (!customer) {
    return NextResponse.json({ message: "Customer not found" }, { status: 404 });
  }

  return NextResponse.json(customer);
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: customerId } = await context.params;
    const body = await req.json();

    const index = customers.findIndex((c) => c.id === customerId);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Customer not found" }, { status: 404 });
    }

    customers[index] = {
      ...customers[index],
      ...body,
      lastContact: new Date().toISOString(), // update last contact
    };

    fs.writeFileSync(filePath, JSON.stringify(customers, null, 2));

    return NextResponse.json({ success: true, customer: customers[index] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update customer" }, { status: 400 });
  }
}
