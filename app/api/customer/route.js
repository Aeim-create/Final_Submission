import Customer from "@/models/Customer"; // Assuming you have a Customer model

// GET: Retrieve all customers
export async function GET() {
  return Response.json(await Customer.find());
}

// POST: Create a new customer
export async function POST(request) {
  const body = await request.json();
  const customer = new Customer(body);
  await customer.save();
  return Response.json(customer);
}

// PUT: Update a customer by ID (replace entire customer information)
export async function PUT(request) {
  const body = await request.json();
  const { _id, ...updateData } = body; // Destructure _id out for the update
  const customer = await Customer.findByIdAndUpdate(_id, updateData, { new: true });

  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }

  return Response.json(customer);
}

// DELETE: Delete a customer by ID
export async function DELETE(request) {
  const { _id } = await request.json(); // Assuming the request body contains the ID of the customer to delete

  const customer = await Customer.findByIdAndDelete(_id);

  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }

  return new Response("Customer deleted successfully", { status: 200 });
}