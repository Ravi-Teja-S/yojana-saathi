import { connectDB } from '@/lib/mongodb'
import Scheme from '@/models/Scheme'

export async function GET(
  req: Request,
  { params }: { params: { category: string } }
) {
  await connectDB()

  const { category } = params

  try {
    const schemes = await Scheme.find({ category })
    return Response.json(schemes)
  } catch (error) {
    console.error('Error fetching schemes:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}