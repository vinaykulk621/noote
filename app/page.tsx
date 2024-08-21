import { GithubSVG } from '@/components/GitHub'
import InputField from '@/components/InputField'

export default function Home() {
  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center space-y-3">
        <h1 className="xs:text-4xl lg:text-9xl">noote</h1>
        <InputField />
        <GithubSVG />
      </div>
    </>
  )
}
