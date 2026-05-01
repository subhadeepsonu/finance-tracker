import type { Metadata } from 'next'
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ReactQueryProvider from '@/components/providers/react-query-provider'
import Link from 'next/link'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'BucketPay',
  description: 'Track each income separately.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <ClerkProvider>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

            <nav className="fixed top-0 z-50 w-full border-b border-blue-100 bg-white/85 backdrop-blur-md">
              <div className="mx-auto max-w-7xl ">
                <div className="flex h-15 items-center justify-between">

                  {/* Logo */}
                  <Link href="/" className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700" />
                    <span className="font-semibold text-blue-900 text-sm">BucketPay</span>
                  </Link>

                  {/* Center Nav — signed in only */}
                  <Show when="signed-in">
                    <div className="hidden md:flex items-center gap-6">
                      <Link
                        href="/dashboard"
                        className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/categories"
                        className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                      >
                        Categories
                      </Link>
                    </div>
                  </Show>

                  {/* Right section */}
                  <div className="flex items-center gap-2">
                    <Show when="signed-out">
                      <SignInButton>
                        <button className="text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md transition-colors cursor-pointer">
                          Sign in
                        </button>
                      </SignInButton>

                      <div className="h-4 w-px bg-blue-100" />

                      <SignUpButton>
                        <button className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md transition-colors cursor-pointer">
                          Sign up
                        </button>
                      </SignUpButton>
                    </Show>

                    <Show when="signed-in">
                      <UserButton />
                    </Show>
                  </div>

                </div>
              </div>
            </nav>

            {children}
          </body>
        </ClerkProvider>
      </ReactQueryProvider>
    </html>
  )
}