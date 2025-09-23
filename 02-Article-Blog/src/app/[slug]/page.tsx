import { getArticleBySlug } from '@/services/articles'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Comments from './Comments'

type Props = { params: { slug: string } }

export const revalidate = 60 // ISR: 每分钟再生

export async function generateStaticParams() {
  // 可选：在构建时预渲染部分热门文章（留空由首次访问触发 ISR）
  return []
}

export async function generateMetadata({ params }: Props) {
  const article = await getArticleBySlug(params.slug).catch(() => null)
  if (!article) return { title: '文章不存在' }
  return { title: article.title, description: article.content?.slice(0, 100) }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug).catch(() => null)
  if (!article) return notFound()

  return (
    <div className="max-w-3xl mx-auto p-6 prose prose-slate dark:prose-invert">
      <h1>{article.title}</h1>
      <div className="text-sm text-gray-500">{new Date(article.created_at).toLocaleString()}</div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content || ''}</ReactMarkdown>
      {Array.isArray(article.tags) && article.tags.length > 0 && (
        <div className="flex gap-2 mt-6">
          {article.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 border rounded">#{t}</span>
          ))}
        </div>
      )}
      <Comments articleId={article.id} />
    </div>
  )
}


