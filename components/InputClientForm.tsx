'use client'

import React, { useRef } from 'react'

export default function InputClientForm({
  handleSubmit,
}: {
  handleSubmit: (formData: FormData) => void
}) {
  const formRef = useRef<HTMLFormElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (formRef.current) {
        const formData = new FormData(formRef.current)
        handleSubmit(formData)
      }
    }
  }

  return (
    <form
      ref={formRef}
      className="fixed bottom-8 flex w-screen items-center justify-around text-xl"
    >
      <textarea
        id="content"
        name="content"
        autoFocus
        className="max-h-52 w-2/3 overflow-y-auto rounded-md border border-black bg-transparent/60 p-2 text-white"
        role="textbox"
        onKeyDown={handleKeyDown}
      />
    </form>
  )
}
