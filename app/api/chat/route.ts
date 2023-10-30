import { readFile } from "fs/promises"
import { NextResponse } from "next/server"
import { join } from "path"

export const runtime = "nodejs"

export const POST = async (req: Request) => {
  const { message } = await req.json()

  const filePath = join(process.cwd(), "public", "kouhaku.csv")
  console.log(filePath)

  const kouhaku = await readFile(filePath, "utf-8")
  console.log(kouhaku)

  // const document = new Document({ text: kouhaku })

  // const index = await VectorStoreIndex.fromDocuments([document])

  // const queryEngine = index.asQueryEngine()

  // const response = await queryEngine.query(message)

  // return NextResponse.json(response.toString())

  return NextResponse.json({ message: "Hello World" })
}
