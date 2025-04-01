import { ReactNode } from 'react'
import Head from 'next/head'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>LMS Platform</title>
        <meta name="description" content="Learning Management System" />
      </Head>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}