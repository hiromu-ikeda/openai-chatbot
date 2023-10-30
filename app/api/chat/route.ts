import { readFile } from "fs/promises"
import { Document, VectorStoreIndex } from "llamaindex"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { message } = await req.json()

  const kouhaku = await readFile("public/kouhaku.csv", "utf-8")

  const document = new Document({ text: kouhaku })

  const index = await VectorStoreIndex.fromDocuments([document])

  const queryEngine = index.asQueryEngine()

  const response = await queryEngine.query(message)

  return NextResponse.json(response.toString())
}
