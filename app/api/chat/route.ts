import { readFile } from "fs/promises"
import { Document } from "llamaindex"
import { NextResponse } from "next/server"
import { join } from "path"

export const runtime = "nodejs"

export const POST = async (req: Request) => {
  const { message } = await req.json()

  const filePath = join(process.cwd(), "public", "kouhaku.csv")

  const kouhaku = await readFile(filePath, "utf-8")

  const document = new Document({ text: kouhaku })
  console.log(document)

  // const index = await VectorStoreIndex.fromDocuments([document])

  // const queryEngine = index.asQueryEngine()

  // const response = await queryEngine.query(message)

  // return NextResponse.json(response.toString())

  return NextResponse.json({ message: "Hello World" })
}
