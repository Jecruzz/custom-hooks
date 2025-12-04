import useFetch from './useFetch';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

export function usePosts() {
  const { data, loading, error, refetch } = useFetch(POSTS_URL);
  return {
    posts: data || [],
    loading,
    error,
    refetch,
  };
}

export default usePosts;
