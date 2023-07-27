import { supabase } from '../../supabase'

type dataFormat = {
  content: string;
  created_at?: string;
  id?: string;
  pages?: string;
}[]

export default async function content(table: string): Promise<dataFormat> {
  try {
    const { data, error } = await supabase.from('pages').select().eq('pages', table)
    if (data) {
      return data || [{ content: 'noote' }]
    }
    try {
      const { data, error } = await supabase
        .from('pages')
        .insert([{ pages: table, content: 'noote' }])

      return [{ content: 'noote' }]
    } catch (e) {
      console.log(e)
    }
  } catch (e) {
    console.log(e)
  }
  return [{ content: 'notte' }]
}
