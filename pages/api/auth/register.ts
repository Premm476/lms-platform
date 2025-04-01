// pages/api/auth/register.ts
import { hash } from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { signIn } from 'next-auth/react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, password, role } = req.body

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await hash(password, 12)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'STUDENT'
      }
    })

    // Automatically sign in the user after registration
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/dashboard' // Redirect to dashboard after login
    })

    if (result?.error) {
      console.error('Auto-login failed:', result.error)
      // Still return success but without auto-login
      return res.status(201).json({ 
        user, 
        message: 'Registration successful. Please login.' 
      })
    }

    return res.status(201).json({ 
      user, 
      redirectUrl: result?.url || '/dashboard' 
    })

  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}