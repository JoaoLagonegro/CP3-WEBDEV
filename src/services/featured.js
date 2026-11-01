import { supabase } from './supabase';

export async function fetchFeatured() {
  const { data, error } = await supabase.from('featured_projects').select('repo_name');
  if (error) throw error;
  return data.map((row) => row.repo_name);
}

export async function setFeatured(repoName, featured) {
  if (featured) {
    const { error } = await supabase
      .from('featured_projects')
      .upsert(
        { repo_name: repoName },
        { onConflict: 'repo_name', ignoreDuplicates: true },
      );
    if (error) throw error;
    return;
  }

  const { error } = await supabase
    .from('featured_projects')
    .delete()
    .eq('repo_name', repoName);
  if (error) throw error;
}
