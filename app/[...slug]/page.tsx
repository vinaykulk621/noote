import { revalidatePath } from 'next/cache'
import { supabase } from '../../supabase'
import content from './content'
import { Suspense } from 'react'
import Loading from './loading'
import { Textarea } from '@/components/ui/textarea'

export async function generateMetadata({ params }: { params: { slug: Array<string> } }) {
  return {
    title: `noote | ${params.slug.join('_')}`,
    description:
      'For Cheating during lab exams and sharing stuff online easily. DUH!!',
    keywords: 'dontpad.com,note,notes_app,online_text_share,easy_share',
    author: 'Vinay Kulkarni',
  }
}

export default async function Home({ params }: { params: { slug: Array<string> } }) {
  const table = params.slug.join('_')
  const data = await content(table)

  async function handle(params: FormData) {
    'use server'

    try {
      await supabase.from('pages').delete().eq('id', params.get('id'))
      revalidatePath('/[...slug]')
    } catch (e) {
      console.log(e)
    }
  }

  async function submitDataToDatabase(formData: FormData) {
    'use server'

    try {
      await supabase
        .from('pages')
        .insert([{ pages: table, content: formData.get('content') as string }])
      revalidatePath('/[...slug]')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div className="xs:flex xs:items-center xs:justify-center xs:mb-16 mb-16 md:flex md:items-center md:justify-center">
        <div className="flex flex-col items-start justify-start space-y-4 p-2 max-w-2xl">
          <Suspense fallback={<Loading />}>
            {data?.map((msg) => {
              return (
                <>
                  <div className="flex flex-row" key={msg?.id}>
                    <form action={handle}>
                      <button
                        type="submit"
                        name="id"
                        value={msg?.id}
                        className="right-2 top-5 m-1 flex-grow-0 rounded-sm bg-zinc-500 px-1 py-0 text-xl text-white"
                      >
                        X
                      </button>
                    </form>
                    <pre
                      className="border-l-4 border-black bg-gray-100 p-2"
                    >
                      {msg?.content}
                    </pre>
                  </div>
                </>
              )
            })}
          </Suspense>
        </div>
      </div>
      <form
        className="fixed bottom-2 flex w-screen items-center justify-around bg-white"
        action={submitDataToDatabase}
      >
        <Textarea
          className="ml-2 flex-grow border-2 border-black p-2 placeholder:text-2xl"
          placeholder="Enter your note"
          name="content"
          required
        />

        <button
          className="m-2 rounded-lg bg-black p-2 text-center text-2xl text-white"
          type="submit"
        >
          &#8594;
        </button>
      </form>
    </>
  )
}
