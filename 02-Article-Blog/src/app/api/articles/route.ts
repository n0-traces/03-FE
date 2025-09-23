import { NextRequest, NextResponse } from 'next/server'
import { createArticle, getArticles } from '@/services/articles'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page') ?? '1')
  const pageSize = Number(searchParams.get('pageSize') ?? '10')
  const limit = Math.max(1, Math.min(50, pageSize))
  const offset = (Math.max(1, page) - 1) * limit

  try {
    const { data, total } = await getArticles(limit, offset)
    return NextResponse.json({ data, total, page, pageSize: limit })
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const article = await createArticle(body)
    return NextResponse.json(article, { status: 201 })
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 400 })
  }
}


