import { GithubSVG } from "./GitHub";

export default function Home() {
  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center space-y-3 bg-black text-white">
        <h1 className="xs:text-4xl lg:text-9xl">noote</h1>
        <p className="xs:text-xl lg:text-2xl">
          noote.vercel.app/
          <span className="text-gray-400 transition-all duration-200 hover:text-gray-300">
            your-secret-url
          </span>
        </p>
        <GithubSVG />
      </div>
    </>
  );
}
