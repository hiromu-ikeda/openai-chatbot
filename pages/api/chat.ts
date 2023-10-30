import { readFile } from "fs/promises"
import { Document, VectorStoreIndex } from "llamaindex"
import { NextApiRequest, NextApiResponse } from "next"
import { join } from "path"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }
  const { message } = JSON.parse(req.body)

  const filePath = join(process.cwd(), "public", "kouhaku.csv")

  const kouhaku = await readFile(filePath, "utf-8")

  const document = new Document({ text: kouhaku })

  const index = await VectorStoreIndex.fromDocuments([document])

  const queryEngine = index.asQueryEngine()

  const response = await queryEngine.query(message)

  res.status(200).json(response.toString())

  // return NextResponse.json({ message: "Hello World" })
}
