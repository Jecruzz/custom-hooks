import useFetch from './useFetch';

export function usePost(id) {
  const url = id ? `https://jsonplaceholder.typicode.com/posts/${id}` : null;
  const { data, loading, error, refetch } = useFetch(url, null, [id]);
  return {
    post: data || null,
    loading,
    error,
    refetch,
  };
}

export default usePost;
