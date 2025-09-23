"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1, '标题必填').max(200),
  slug: z.string().min(1, 'Slug 必填').regex(/^[a-z0-9-]+$/, '只允许小写字母、数字和短横线'),
  content: z.string().optional(),
  tags: z.string().optional(),
})

export default function NewArticlePage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: '', slug: '', content: '', tags: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const parsed = schema.safeParse(form)
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message || '表单校验失败')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          slug: form.slug,
          content: form.content,
          tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        })
      })
      if (!res.ok) throw new Error(await res.text())
      const created = await res.json()
      router.push(`/${created.slug}`)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">创建文章</h1>
      {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
      <form onSubmit={onSubmit} className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm text-gray-600">标题</span>
          <input className="border rounded px-3 py-2" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-gray-600">Slug</span>
          <input className="border rounded px-3 py-2" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="my-first-post" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-gray-600">标签（用逗号分隔）</span>
          <input className="border rounded px-3 py-2" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="nextjs,web,notes" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-gray-600">内容（Markdown）</span>
          <textarea className="border rounded px-3 py-2 min-h-48" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
        </label>
        <button disabled={loading} className="px-4 py-2 border rounded disabled:opacity-50" type="submit">{loading ? '提交中...' : '提交'}</button>
      </form>
    </div>
  )
}


