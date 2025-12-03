import { Link } from 'react-router-dom';
import usePosts from '../hooks/usePosts';

function ListaPosts() {
  const { posts, loading: cargando, error } = usePosts();

  if (cargando) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Lista de Posts</h2>
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <Link to={`/posts/${post.id}`} className="post-link">Ver Detalle</Link>
            <h3>{post.title}</h3>
            <p>{post.body && post.body.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaPosts;

