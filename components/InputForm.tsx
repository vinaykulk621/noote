import { supabase } from '@/supabase'
import { revalidatePath } from 'next/cache'

export default function InputForm({
  params,
}: {
  params: { slug: Array<string> }
}) {
  const table = params.slug.join('_')

  async function handleSubmit(formData: FormData) {
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
    <form
      className="fixed bottom-8 flex w-screen items-center justify-around text-xl"
      action={handleSubmit}
    >
      <input
        id="content"
        name="content"
        autoFocus
        className="max-h-52 w-2/3 overflow-y-auto rounded-md border border-black p-2"
        role="textbox"
        contentEditable
      />
    </form>
  )
}
