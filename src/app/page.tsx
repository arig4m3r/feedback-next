'use client'

import { useState } from "react"
import ListTable from "./components/ListTable"

export default function Home() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

  async function processFeedback(message: string) {
    setInput("")
    setLoading(true)
    try {
      const res = await fetch('/api/getFeedback', {
        body: JSON.stringify({ message }),
        method: 'post'
      }).then(res => res.json())
        .then((feedback: Feedback) => {
          setFeedbacks([feedback, ...feedbacks])
        })
    } catch (error) {
      alert('Um erro aconteceu')
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <div className="bg-gray-900 w-screen h-screen">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative px-5 py-5">
        <div className="absolute inset-y-0 left-0 flex items-center pl-7 pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 pl-10 rounded-lg text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Avaliação do cliente" value={input} onChange={e => setInput(e.target.value)} disabled={loading} required />
        <button type="submit" className="text-white absolute right-8 bottom-7 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => processFeedback(input)} disabled={loading}>Enviar</button>
      </div>

      <ListTable feedbacks={feedbacks} />
    </div>
  )
}
