import { ChangeEvent, FormEvent, useState } from "react"

export const useChat = () => {
  const [messages, setMessages] = useState<
    { id: number; content: string; role: string }[]
  >([])
  const [input, setInput] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setInput("")

    const formData = new FormData(e.currentTarget)
    const message = formData.get("message") as string

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), content: message, role: "user" },
    ])

    const response = await fetch("/api/chat", {
      body: JSON.stringify({ message }),
      method: "POST",
    })

    const answer: string = await response.json()

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), content: answer, role: "AI" },
    ])
    setIsLoading(false)
  }

  return { messages, input, onInputChange, handleSubmit, isLoading }
}
