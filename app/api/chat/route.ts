import { readFile } from "fs/promises"
import { NextResponse } from "next/server"
import { join } from "path"

export const runtime = "nodejs"

export const POST = async (req: Request) => {
  const { message } = await req.json()
  console.log(message)

  const filePath = join(process.cwd(), "public", "kouhaku.csv")

  const kouhaku = await readFile(filePath, "utf-8")
  console.log(kouhaku)

  // const document = new Document({ text: kouhaku })

  // const index = await VectorStoreIndex.fromDocuments([document])

  // const queryEngine = index.asQueryEngine()

  // const response = await queryEngine.query(message)
  // console.log(response.toString())

  // return NextResponse.json(response.toString())

  return NextResponse.json({ message: "Hello World" })
}
