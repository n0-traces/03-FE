"use client"
import useSWR from 'swr'
import Link from 'next/link'
import { useState } from 'react'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function Home() {
  const [page, setPage] = useState(1)
  const pageSize = 10
  const { data, error, isLoading } = useSWR(`/api/articles?page=${page}&pageSize=${pageSize}`, fetcher, {
    refreshInterval: 30000
  })

  if (error) return <div className="p-6">加载失败</div>
  if (isLoading || !data) return <div className="p-6 animate-pulse">加载中...</div>

  const { data: articles, total } = data as { data: { id: string; title: string; slug: string; created_at: string }[]; total: number }
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">文章列表</h1>
      <div className="grid gap-4">
        {articles.map((a) => (
          <Link key={a.id} href={`/${a.slug}`} className="p-4 border rounded hover:bg-gray-50">
            <div className="font-medium">{a.title}</div>
            <div className="text-sm text-gray-500">{new Date(a.created_at).toLocaleString()}</div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between mt-6">
        <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>上一页</button>
        <span className="text-sm text-gray-600">{page} / {totalPages}</span>
        <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>下一页</button>
      </div>
    </div>
  )
}
