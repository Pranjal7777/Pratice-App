'use server'

import { connectToDatabase } from '@/utils/connect.db'
import { hash } from 'bcryptjs'

export async function signUp(prevState: any, formData:any) {
  const { db } = await connectToDatabase()
  const users = db.collection('users')

  const name = formData.name as string
  const email = formData.email as string
  const password = formData.password as string

  // Check if user already exists
  const existingUser = await users.findOne({ email })
  if (existingUser) {
    return { error: 'User already exists',status:400 }
  }

  // Hash the password
  const hashedPassword = await hash(password, 12)

  // Create new user
  const result = await users.insertOne({
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  })

  if (!result.insertedId) {
    return { error: 'Failed to create user' }
  }

  return { success: true,status:201 }
}