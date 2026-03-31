import { connectDB } from '@/lib/mongodb'
import Scheme from '@/models/Scheme'

export async function GET(req: Request) {
  await connectDB()

  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')

  if (category) {
    const schemes = await Scheme.find({ category })
    return Response.json(schemes)
  }

  const schemes = await Scheme.find()
  return Response.json(schemes)
}