import { NextRequest, NextResponse } from 'next/server'
import { deleteArticle, updateArticle } from '@/services/articles'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const updated = await updateArticle(params.id, body)
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 400 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteArticle(params.id)
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 400 })
  }
}


