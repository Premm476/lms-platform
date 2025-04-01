import NextAuth, { type NextAuthOptions, DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'
import { compare } from 'bcryptjs'

type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'

declare module 'next-auth' {
  interface User {
    id: string
    name?: string | null
    email?: string | null
    role: UserRole
    emailVerified?: Date | null
    avatar?: string | null
    bio?: string | null
    enrollments?: Array<{
      id: string
      courseId: string
      progress?: number | null
      completed: boolean
    }>
    taughtCourses?: Array<{
      id: string
      title: string
      studentCount: number
    }>
  }
  
  interface Session extends DefaultSession {
    user: {
      id: string
      name?: string | null
      email?: string | null
      role: UserRole
      emailVerified?: Date | null
      avatar?: string | null
      bio?: string | null
      enrollments?: Array<{
        id: string
        courseId: string
        progress?: number | null
        completed: boolean
      }>
      taughtCourses?: Array<{
        id: string
        title: string
        studentCount: number
      }>
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    name?: string | null
    email?: string | null
    role: UserRole
    emailVerified?: Date | null
    avatar?: string | null
    bio?: string | null
    enrollments?: Array<{
      id: string
      courseId: string
      progress?: number | null
      completed: boolean
    }>
    taughtCourses?: Array<{
      id: string
      title: string
      studentCount: number
    }>
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        const user = await prisma.user.findFirst({
          where: {
            email: {
              equals: credentials.email.toLowerCase(),
            }
          },
          include: {
            enrollments: {
              select: {
                id: true,
                courseId: true,
                progress: true,
                completed: true
              }
            },
            taughtCourses: {
              select: {
                id: true,
                title: true,
                enrollments: {
                  select: {
                    id: true,
                    userId: true
                  }
                }
              }
            }
          }
        })

        if (!user || !user.password) {
          throw new Error('Invalid credentials')
        }

        const isValid = await compare(credentials.password, user.password)
        if (!isValid) {
          throw new Error('Invalid credentials')
        }

        // Transform the user object to match our User type
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as UserRole,
          emailVerified: user.emailVerified,
          avatar: user.avatar,
          bio: user.bio,
          enrollments: user.enrollments,
          taughtCourses: user.taughtCourses?.map(course => ({
            id: course.id,
            title: course.title,
            studentCount: course.enrollments.length
          }))
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.email = user.email
        token.name = user.name
        token.emailVerified = user.emailVerified
        token.avatar = user.avatar
        token.bio = user.bio
        token.enrollments = user.enrollments
        token.taughtCourses = user.taughtCourses
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.email = token.email
        session.user.name = token.name
        session.user.emailVerified = token.emailVerified
        session.user.avatar = token.avatar
        session.user.bio = token.bio
        session.user.enrollments = token.enrollments
        session.user.taughtCourses = token.taughtCourses
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('/login')) {
        return `${baseUrl}/dashboard`
      }
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/welcome'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
}

export default NextAuth(authOptions)