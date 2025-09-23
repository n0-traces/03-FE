import { NextRequest, NextResponse } from 'next/server'
import { createComment, listComments } from '@/services/comments'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const articleId = searchParams.get('articleId')
  if (!articleId) {
    return NextResponse.json({ message: 'articleId is required' }, { status: 400 })
  }
  try {
    const data = await listComments(articleId)
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body?.articleId || !body?.content) {
      return NextResponse.json({ message: 'articleId and content are required' }, { status: 400 })
    }
    const data = await createComment(body.articleId, body.content)
    return NextResponse.json(data, { status: 201 })
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 400 })
  }
}


