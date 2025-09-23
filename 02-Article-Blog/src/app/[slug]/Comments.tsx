"use client"
import useSWR from 'swr'
import { useState } from 'react'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function Comments({ articleId }: { articleId: string }) {
  const { data, mutate } = useSWR(`/api/comments?articleId=${articleId}`, fetcher)
  const [content, setContent] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId, content })
    })
    if (res.ok) {
      setContent('')
      mutate()
    }
  }

  const comments = (data?.data ?? []) as { id: string; content: string; created_at: string }[]
  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium mb-2">评论</h2>
      <form onSubmit={onSubmit} className="flex gap-2 mb-4">
        <input className="flex-1 border rounded px-3 py-2" value={content} onChange={e => setContent(e.target.value)} placeholder="写下你的想法..." />
        <button className="px-4 py-2 border rounded" type="submit">提交</button>
      </form>
      <div className="grid gap-3">
        {comments.map(c => (
          <div key={c.id} className="p-3 border rounded">
            <div className="text-sm text-gray-500 mb-1">{new Date(c.created_at).toLocaleString()}</div>
            <div>{c.content}</div>
          </div>
        ))}
        {comments.length === 0 && <div className="text-sm text-gray-500">还没有评论</div>}
      </div>
    </div>
  )
}


