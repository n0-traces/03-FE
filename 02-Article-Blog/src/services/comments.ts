import { supabase, hasSupabase } from '@/lib/supabaseClient'

export type Comment = {
  id: string
  article_id: string
  author_id?: string | null
  content: string
  created_at: string
}

// 简易内存数据库（无 Supabase 时可运行）
const memoryDb = {
  comments: [] as Comment[],
}

export async function listComments(articleId: string) {
  if (!hasSupabase) {
    const data = memoryDb.comments
      .filter(c => c.article_id === articleId)
      .sort((a, b) => (a.created_at < b.created_at ? -1 : 1))
    return data
  }
  const { data, error } = await supabase!
    .from('comments')
    .select('id, article_id, content, created_at')
    .eq('article_id', articleId)
    .order('created_at', { ascending: true })
  if (error) throw new Error(error.message || 'Failed to list comments')
  return data as Comment[]
}

export async function createComment(articleId: string, content: string) {
  if (!hasSupabase) {
    const item: Comment = {
      id: String(Date.now()),
      article_id: articleId,
      content,
      author_id: null,
      created_at: new Date().toISOString(),
    }
    memoryDb.comments.push(item)
    return item
  }
  const { data: userData } = await supabase!.auth.getUser()
  const { data, error } = await supabase!
    .from('comments')
    .insert([{ article_id: articleId, content, author_id: userData.user?.id ?? null }])
    .select()
    .single()
  if (error) throw new Error(error.message || 'Failed to create comment')
  return data as Comment
}

export async function deleteComment(id: string) {
  if (!hasSupabase) {
    const before = memoryDb.comments.length
    memoryDb.comments = memoryDb.comments.filter(c => c.id !== id)
    if (before === memoryDb.comments.length) throw new Error('Comment not found')
    return { success: true }
  }
  const { error } = await supabase!.from('comments').delete().eq('id', id)
  if (error) throw new Error(error.message || 'Failed to delete comment')
  return { success: true }
}


