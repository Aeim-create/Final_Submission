'use client'
import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    memberNumber: {
      type: String,
      required: true,
      unique: true,
    },
    interests: {
      type: [String], // Array of strings for interests
      required: false,
    },
  },
  { strict: false }
)

const Customer =
  mongoose.models.customer || mongoose.model('customer', customerSchema)

export default Customer

const page = () => {
  const data = `
  const customerSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      memberNumber: {
        type: String,
        required: true,
        unique: true,
      },
      interests: {
        type: [String],
        required: false,
      },
    },
    { strict: false }
  )

  const Customer =
    mongoose.models.customer || mongoose.model('customer', customerSchema)
  `;

  return (
    <div>
      <h1>Customer Data Model</h1>
      <pre>
        <code>{data}</code>
      </pre>
    </div>
  )
}

export default page
