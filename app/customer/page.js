"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";

const APIBASE = process.env.NEXT_PUBLIC_API_URL; // This will correctly get your base URL


export default function CustomerManagement() {
  const API_URL = `${APIBASE}/customer`;
  const [customerList, setCustomerList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  
  const { register, handleSubmit, reset } = useForm();

  // Fetch customers from the API
  async function fetchCustomers() {
    try {
      const { data } = await axios.get(`${APIBASE}/customer`);
      // Ensure data is an array
      const customers = Array.isArray(data) 
        ? data.map((customer) => {
            customer.id = customer._id; // Assign a temporary ID for React key
            return customer;
          }) 
        : [];
      setCustomerList(customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }

  // Initialize edit mode
  const startEdit = (customer) => () => {
    setEditMode(true);
    reset(customer);
  };

  // Delete a customer by ID
  const deleteById = (id) => async () => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
      await axios.delete(`${APIBASE}/customer`, {
        data: { _id: id }, // Correctly sending ID to delete
      });
      fetchCustomers(); // Refresh the customer list
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Use effect to fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle form submission for adding or updating customers
  function handleCustomerFormSubmit(data) {
    const request = editMode 
      ? axios.put(`${APIBASE}/customer`, { ...data, _id: data.id }) // Add ID to data for update
      : axios.post(`${APIBASE}/customer`, data);

    request
      .then(() => {
        reset({ name: "", dateOfBirth: "", memberNumber: "", interests: "" }); // Reset form
        setEditMode(false); // Exit edit mode
        fetchCustomers(); // Refresh the customer list
      })
      .catch((error) => console.error("Error submitting customer data:", error));
  }

  return (
    <main>
      <div className="flex flex-row gap-4">
        <div className="flex-1 w-64">
          <form onSubmit={handleSubmit(handleCustomerFormSubmit)}>
            <div className="grid grid-cols-2 gap-4 w-fit m-4">
              <div>Name:</div>
              <div>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div>Date of Birth:</div>
              <div>
                <input
                  type="date"
                  {...register("dateOfBirth", { required: true })}
                  className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div>Member Number:</div>
              <div>
                <input
                  type="text"
                  {...register("memberNumber", { required: true })}
                  className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div>Interests:</div>
              <div>
                <input
                  type="text"
                  {...register("interests", { required: false })}
                  placeholder="Comma-separated interests"
                  className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div className="col-span-2 text-right">
                <input
                  type="submit"
                  value={editMode ? "Update" : "Add"}
                  className={`py-2 px-4 rounded-full font-bold text-white ${editMode ? "bg-blue-800 hover:bg-blue-700" : "bg-green-800 hover:bg-green-700"}`}
                />
                {editMode && (
                  <button
                    type="button" // Prevent form submission
                    onClick={() => {
                      reset({ name: "", dateOfBirth: "", memberNumber: "", interests: "" });
                      setEditMode(false);
                    }}
                    className="ml-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="border m-4 bg-slate-300 flex-1 w-64">
          <ul>
            {customerList.map((c) => (
              <li key={c._id}>
                <button className="border border-black p-1" onClick={startEdit(c)}>Edit</button>{" "}
                <button className="border border-black p-1" onClick={deleteById(c._id)}>Delete</button>{" "}
                <Link href={`/customer/${c._id}`}>{c.name}</Link> [DOB: {new Date(c.dateOfBirth).toLocaleDateString()}] [Member Number: {c.memberNumber}]
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
