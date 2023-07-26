import { supabase } from '../../supabase'
type data = {
  id: string
  content: string
}

export default async function content(table: string): data[] {
  try {
    const { data, error } = await supabase
      .from('pages')
      .select()
      .eq('pages', table)
    console.log(data);
    if (data) {
      return data || ['noote']
    }
    try {
      const { data, error } = await supabase
        .from('pages')
        .insert([{ pages: table, content: 'noote' }])

      return ['notte']
    } catch (e) {
      console.log(e)
    }
  } catch (e) {
    console.log(e)
  }
}
