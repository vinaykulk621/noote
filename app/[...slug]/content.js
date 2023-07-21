import { supabase } from '../../supabase'

export default async function content(table) {
  try {
    const { data, error } = await supabase
      .from('pages')
      .select()
      .eq('pages', table)
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
