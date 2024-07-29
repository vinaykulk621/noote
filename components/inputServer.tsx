import { supabase } from '@/supabase'
import { revalidatePath } from 'next/cache'
import InputClientForm from './InputClientForm'

export default function InputServer({
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

  return <InputClientForm handleSubmit={handleSubmit} />
}
