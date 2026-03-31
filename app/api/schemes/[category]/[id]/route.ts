import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Scheme from '@/models/Scheme'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; id: string }> }
) {
  try {
    const { category, id } = await params

    await connectDB()
    const scheme = await Scheme.findOne({ category, id }).lean()

    if (!scheme) {
      return NextResponse.json({ error: 'Scheme not found' }, { status: 404 })
    }

    return NextResponse.json(scheme)
  } catch (error) {
    console.error('Error fetching scheme:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}