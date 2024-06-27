import { revalidatePath } from 'next/cache'
import { supabase } from '../../supabase'
import content from './content'
import { Suspense } from 'react'
import Loading from './loading'
import InputForm from '@/components/InputForm'

export async function generateMetadata({
  params,
}: {
  params: { slug: Array<string> }
}) {
  return {
    title: `noote | ${params.slug.join('_')}`,
    description:
      'For Cheating during lab exams and sharing stuff online easily. DUH!!',
    keywords: 'dontpad.com,note,notes_app,online_text_share,easy_share',
    author: 'Vinay Kulkarni',
  }
}

export default async function Home({
  params,
}: {
  params: { slug: Array<string> }
}) {
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

  return (
    <>
      <div className="xs:flex xs:items-center xs:justify-center xs:mb-16 mb-16 md:flex md:items-center md:justify-center">
        <div className="flex max-w-2xl flex-col items-start justify-start space-y-4 p-2">
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
                    <pre className="border-l-4 border-black bg-gray-100 p-2">
                      {msg?.content}
                    </pre>
                  </div>
                </>
              )
            })}
          </Suspense>
        </div>
      </div>
      <InputForm
        params={{
          slug: params.slug,
        }}
      />
    </>
  )
}
