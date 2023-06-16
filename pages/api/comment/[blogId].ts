import { fetchComments } from "@/libs/database"
import type { NextApiRequest, NextApiResponse } from "next"

const getComments = async (req: NextApiRequest, res: NextApiResponse) => {
  const { blogId } = req.query

  if (blogId) {
    const comments = await fetchComments(blogId as string)
    return res.status(200).json(comments)
  }
}

const apiRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return await getComments(req, res)
    default:
      return res.status(405).json({message: "Method not allowed"})
  }
}

export default apiRequest
