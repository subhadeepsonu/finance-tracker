"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-blue-100 bg-white/85 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 lg:px-0">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700" />
                        <span className="font-semibold text-blue-900 text-sm">BucketPay</span>
                    </Link>

                    {/* Desktop Nav */}
                    <Show when="signed-in">
                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-blue-600">
                                Dashboard
                            </Link>
                            <Link href="/categories" className="text-sm font-medium text-slate-600 hover:text-blue-600">
                                Categories
                            </Link>
                        </div>
                    </Show>

                    {/* Right Section */}
                    <div className="flex items-center gap-2">

                        {/* Desktop Auth */}
                        <div className="hidden md:flex items-center gap-2">
                            <Show when="signed-out">
                                <SignInButton>
                                    <button className="text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md">
                                        Sign in
                                    </button>
                                </SignInButton>

                                <div className="h-4 w-px bg-blue-100" />

                                <SignUpButton>
                                    <button className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md">
                                        Sign up
                                    </button>
                                </SignUpButton>
                            </Show>

                            <Show when="signed-in">
                                <UserButton />
                            </Show>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="md:hidden p-2 rounded-md hover:bg-slate-100"
                        >
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </button>

                    </div>
                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className="md:hidden border-t border-slate-200 py-4 flex flex-col gap-4">

                        <Show when="signed-in">
                            <Link
                                href="/dashboard"
                                onClick={() => setOpen(false)}
                                className="text-sm font-medium text-slate-700 hover:text-blue-600"
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/categories"
                                onClick={() => setOpen(false)}
                                className="text-sm font-medium text-slate-700 hover:text-blue-600"
                            >
                                Categories
                            </Link>
                        </Show>

                        <div className="h-px bg-slate-200" />

                        <Show when="signed-out">
                            <SignInButton>
                                <button className="w-full text-left text-sm font-medium text-blue-600">
                                    Sign in
                                </button>
                            </SignInButton>

                            <SignUpButton>
                                <button className="w-full text-left text-sm font-medium text-blue-600">
                                    Sign up
                                </button>
                            </SignUpButton>
                        </Show>

                        <Show when="signed-in">
                            <div className="pt-2">
                                <UserButton />
                            </div>
                        </Show>

                    </div>
                )}
            </div>
        </nav>
    )
}