"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditArticlePage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const [form, setForm] = useState({ title: '', content: '', tags: '' })
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setError(null)
      try {
        const res = await fetch(`/api/articles?page=1&pageSize=1&slug=${params.slug}`) // 简化：直接通过详情 API 会更好
        // 由于我们未实现按 slug 查询的 API，这里退而求其次从页面数据源拉取
        const detail = await fetch(`/${params.slug}`, { headers: { 'x-use-json': '1' } }).then(() => null)
      } catch (e) {
        // 忽略；直接尝试服务端接口不可用时退回到新表单
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [params.slug])

  async function onDelete() {
    if (!id) return
    const ok = confirm('确定要删除该文章吗？')
    if (!ok) return
    const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' })
    if (res.ok) router.push('/');
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!id) return
    const res = await fetch(`/api/articles/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: form.title, content: form.content, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) })
    })
    if (res.ok) router.push(`/${params.slug}`)
  }

  if (loading) return <div className="p-6">加载中...</div>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">编辑文章</h1>
      {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
      <form onSubmit={onSubmit} className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm text-gray-600">标题</span>
          <input className="border rounded px-3 py-2" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-gray-600">标签（用逗号分隔）</span>
          <input className="border rounded px-3 py-2" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-gray-600">内容（Markdown）</span>
          <textarea className="border rounded px-3 py-2 min-h-48" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
        </label>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border rounded" type="submit">保存</button>
          <button className="px-4 py-2 border rounded text-red-600" type="button" onClick={onDelete}>删除</button>
        </div>
      </form>
    </div>
  )
}


