import { supabase, hasSupabase } from '@/lib/supabaseClient'

export type Article = {
  id: string
  title: string
  slug: string
  content?: string | null
  tags?: string[] | null
  author_id?: string | null
  created_at: string
  updated_at?: string | null
}

export type CreateArticleInput = {
  title: string
  slug: string
  content?: string
  tags?: string[]
}

// 简易内存数据库（无 Supabase 时可运行）
const memoryDb = {
  articles: [] as Article[],
}

function ensureSeed() {
  if (memoryDb.articles.length === 0) {
    const now = new Date().toISOString()
    memoryDb.articles.push(
      { id: '1', title: 'Hello World', slug: 'hello-world', content: 'First post', tags: ['hello'], author_id: null, created_at: now, updated_at: now },
      { id: '2', title: 'About', slug: 'about', content: 'About this blog', tags: ['about'], author_id: null, created_at: now, updated_at: now },
    )
  }
}

export async function getArticles(limit = 10, offset = 0) {
  if (!hasSupabase) {
    ensureSeed()
    const sorted = [...memoryDb.articles].sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
    const slice = sorted.slice(offset, offset + limit)
    const mapped = slice.map(a => ({ id: a.id, title: a.title, slug: a.slug, created_at: a.created_at }))
    return { data: mapped, total: memoryDb.articles.length }
  }

  const { data, error, count } = await supabase!
    .from('articles')
    .select('id, title, slug, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw new Error(error.message || 'Failed to fetch articles')
  return { data: data as Pick<Article, 'id' | 'title' | 'slug' | 'created_at'>[], total: count ?? 0 }
}

export async function getArticleBySlug(slug: string) {
  if (!hasSupabase) {
    ensureSeed()
    const found = memoryDb.articles.find(a => a.slug === slug)
    if (!found) throw new Error('Article not found')
    return found
  }

  const { data, error } = await supabase!
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw new Error(error.message || 'Failed to fetch article')
  return data as Article
}

export async function createArticle(articleData: CreateArticleInput) {
  if (!hasSupabase) {
    ensureSeed()
    const now = new Date().toISOString()
    const item: Article = {
      id: String(Date.now()),
      title: articleData.title,
      slug: articleData.slug,
      content: articleData.content ?? null,
      tags: articleData.tags ?? null,
      author_id: null,
      created_at: now,
      updated_at: now,
    }
    memoryDb.articles.push(item)
    return item
  }

  const { data: userData } = await supabase!.auth.getUser()
  const authorId = userData.user?.id ?? null

  const { data, error } = await supabase!
    .from('articles')
    .insert([{ ...articleData, author_id: authorId }])
    .select()
    .single()

  if (error) throw new Error(error.message || 'Failed to create article')
  return data as Article
}

export async function updateArticle(id: string, updates: Partial<CreateArticleInput>) {
  if (!hasSupabase) {
    ensureSeed()
    const idx = memoryDb.articles.findIndex(a => a.id === id)
    if (idx === -1) throw new Error('Article not found')
    const now = new Date().toISOString()
    const updated: Article = { ...memoryDb.articles[idx], ...updates, updated_at: now }
    memoryDb.articles[idx] = updated
    return updated
  }

  const { data, error } = await supabase!
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message || 'Failed to update article')
  return data as Article
}

export async function deleteArticle(id: string) {
  if (!hasSupabase) {
    ensureSeed()
    const before = memoryDb.articles.length
    memoryDb.articles = memoryDb.articles.filter(a => a.id !== id)
    if (memoryDb.articles.length === before) throw new Error('Article not found')
    return { success: true }
  }

  const { error } = await supabase!
    .from('articles')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message || 'Failed to delete article')
  return { success: true }
}


