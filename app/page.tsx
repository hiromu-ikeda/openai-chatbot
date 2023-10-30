"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"
import { useChat } from "./_hooks/useChat"

export default function Chat() {
  const { messages, handleSubmit, input, onInputChange, isLoading } = useChat()

  return (
    <main className="mx-auto w-full h-screen max-w-[500px] flex flex-col gap-8 px-4 py-16">
      <p className="text-center">
        💡2022年の紅白歌合戦について
        <br className="sm:hidden" />
        Chat GPTが学習しているチャットボットです。
        <br />
        通常のChat GPTでは、
        <br />
        明確に回答するのが困難となっています。
      </p>
      <p>
        （例）ゆずが歌ったのは？
        <br />
        （例）誰が出場していますか？
      </p>
      <div className="h-[1px] bg-gray-300" />
      <section className="mb-auto m">
        {messages.map((m) => (
          <div className="mb-4" key={m.id}>
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}
        {isLoading && <Loader className="w-4 h-4 animate-spin" />}
      </section>
      <form className="flex space-x-4" onSubmit={handleSubmit}>
        <Input
          name="message"
          value={input}
          className="rounded-md p-2 text-black"
          placeholder="何か質問してみてください..."
          onChange={onInputChange}
        />
        <Button
          className="border-solid border-2 border-white p-2 rounded-md"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : "送信する"}
        </Button>
      </form>
    </main>
  )
}
