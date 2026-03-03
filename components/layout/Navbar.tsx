"use client"
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <nav className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex gap-4">
        <Link href="/" className="hover:underline">首頁</Link>
        <Link href="/lottery" className="hover:underline">抽籤工具</Link>
        <Link href="/password-generator" className="hover:underline">密碼生成工具</Link>
      </div>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 border rounded-md text-sm"
      >
        {mounted ? (theme === 'dark' ? '切換淺色' : '切換深色') : '切換主題'}
      </button>
    </nav>
  )
}