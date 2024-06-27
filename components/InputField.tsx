'use client'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function InputField() {
  const router = useRouter()
  const [secretUrl, setSecretUrl] = useState('')

  function handleReroute(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (secretUrl) {
      router.push(`https://noote.vercel.app/${secretUrl}`)
    }
  }
  return (
    <>
      <form className="flex flex-row" onSubmit={handleReroute}>
        <p className="xs:text-xl lg:text-2xl">noote.vercel.app/</p>
        <Input
          placeholder="your-secret-url"
          name="secretUrl"
          value={secretUrl}
          onChange={(e) => setSecretUrl(e.target.value)}
          autoFocus
        />
      </form>
    </>
  )
}
